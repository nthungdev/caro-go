import React from 'react'

export default ({
  name,
  label,
  placeholder,
  required = false,
  type = 'text',
}) => (
  <div>
    <label htmlFor={name} className="block">
      <b>{label}</b>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      required={required}
      className="block appearance-none outline-none focus:outline-none mt-1 focus:ring w-full shadow-sm sm:text-sm rounded-none px-4 py-2"
    />
  </div>
)
