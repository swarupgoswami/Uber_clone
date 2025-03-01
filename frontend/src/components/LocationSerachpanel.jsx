
import React from "react";

const LocationSearchPanel = ({ suggestions, onSelectSuggestion }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* Display fetched suggestions */}
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => onSelectSuggestion(elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:shadow-md transition"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem.display_name}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;


