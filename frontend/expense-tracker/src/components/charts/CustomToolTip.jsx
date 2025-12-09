import React from "react";

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-green-500 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="text-sm font-medium text-shadow-gray-900">
            Rs. {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
};

export default CustomToolTip;
