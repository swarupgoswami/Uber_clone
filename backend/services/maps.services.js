const axios = require('axios');

module.exports.getAddresCoordinate=async(address)=>{

    const apiKey= process.env.LOCATIONIQ_API_KEY
    if (!apiKey) {
        throw new Error('LocationIQ API key is missing.');
    }
    
    // Construct the LocationIQ API URL
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(url);
        // Check if we got a valid response with at least one result
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            console.log(lat);
            return { latitude: lat, longitude: lon };
        } else {
            throw new Error('Address not found');
        }
    } catch (error) {
        console.error('Error fetching coordinates from LocationIQ:', error.message);
        throw error;
    }
}

module.exports.getDistanceAndtime=async(origin,destination)=>{
    

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {


            if(response.data.rows[0].elements[0].status ==='ZERO_RESULTS'){
                throw new Error('no routes found');
            }
            const element = response.data.rows[0].elements[0];
            return element;
        } else {
            throw new Error('Unable to fetch distance matrix');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}