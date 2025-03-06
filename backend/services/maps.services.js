const axios = require("axios");
const captainModel = require("../models/captain.models");

module.exports.getAddresCoordinate = async (address) => {
  const apiKey = process.env.LOCATIONIQ_API_KEY;
  if (!apiKey) {
    throw new Error("LocationIQ API key is missing.");
  }

  // Construct the LocationIQ API URL
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

  try {
    const response = await axios.get(url);
    // Check if we got a valid response with at least one result
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      console.log(lat);
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates from LocationIQ:", error.message);
    throw error;
  }
};

module.exports.getDistanceAndtime = async (origin, destination) => {
  try {
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    if (!apiKey) throw new Error("Missing LOCATIONIQ_API_KEY");

    const getCoordinates = async (location) => {
      const geocodeUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
        location
      )}&format=json`;
      const response = await axios.get(geocodeUrl);
      if (response.data?.length) {
        const { lat, lon } = response.data[0];
        return { lat, lon };
      }
      throw new Error(`Geocoding failed for: ${location}`);
    };

    const originCoords = await getCoordinates(origin);
    const destCoords = await getCoordinates(destination);

    console.log(`Origin: ${originCoords.lat}, ${originCoords.lon}`);
    console.log(`Destination: ${destCoords.lat}, ${destCoords.lon}`);

    // ✅ Corrected URL with /json
    const directionsUrl = `https://us1.locationiq.com/v1/directions/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?key=${apiKey}&overview=false`;
    console.log("Directions URL:", directionsUrl);

    const response = await axios.get(directionsUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (response.data?.routes?.length) {
      const { distance, duration } = response.data.routes[0];
      return { distance, duration };
    }

    throw new Error("Directions not found");
  } catch (error) {
    if (error.response) {
      console.error("Response error data:", error.response.data);
      console.error("Status:", error.response.status);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

module.exports.getAutoCompletesuggestion = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.LOCATIONIQ_API_KEY;
  const url = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${encodeURIComponent(
    input
  )}&limit=5`;

  try {
    const response = await axios.get(url);

    // ✅ Corrected the if condition to check if the response is an array and has suggestions
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data; // ✅ Return suggestions array
    } else {
      throw new Error("No suggestions found"); // Handle empty array
    }
  } catch (error) {
    console.error(
      "Error fetching suggestions:",
      error.response?.data || error.message
    ); // Improved logging
    throw new Error("Unable to fetch suggestions"); // Throw a descriptive error
  }
};

// module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
//   // radius in km
//   const captains = await captainModel.find({
//       location: {
//           $geoWithin: {
//               $centerSphere: [[lng, ltd], radius / 6371]
//           }
//       }
//   });

//   return captains;
// }

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // Convert from strings to numbers if needed.
  lat = parseFloat(ltd);
  lng = parseFloat(lng);

  // Calculate tolerances: 1 degree latitude ~ 111km
  const latDelta = radius / 111;
  // Longitude delta depends on the latitude (in radians)
  const lngDelta = radius / (111 * Math.cos((lat * Math.PI) / 180));

  const minLat = lat - latDelta;
  const maxLat = lat + latDelta;
  const minLng = lng - lngDelta;
  const maxLng = lng + lngDelta;

  // Query using a bounding box around the given coordinates.
  const captains = await captainModel.find({
    "location.ltd": { $gte: minLat, $lte: maxLat },
    "location.lng": { $gte: minLng, $lte: maxLng },
  });

  return captains;
};
