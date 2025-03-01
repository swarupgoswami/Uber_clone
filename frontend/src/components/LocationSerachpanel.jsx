import React from "react";

const LocationSerachpanel = ({ suggestions, onSelectSuggestion }) => {
  return (
    <div>
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSelectSuggestion(suggestion)} // Pass selected suggestion
            className="my-2 border-2 border-white active:border-black p-3 rounded-xl flex gap-4 items-center justify-start cursor-pointer"
          >
            <h2 className="bg-[#eeee] flex items-center justify-center h-6 w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="text-lg font-medium">{suggestion}</h4>
          </div>
        ))
      ) : (
        <p className="p-3 text-center text-gray-500">No suggestions found</p>
      )}
    </div>
  );
};

export default LocationSerachpanel;

