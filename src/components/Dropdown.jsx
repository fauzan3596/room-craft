import React from "react";

const Dropdown = ({ label, options, value, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 py-2 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
