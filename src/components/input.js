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
      className="block"
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      required={required}
      className="appearance-none outline-none focus:outline-none mt-1 focus:ring block w-full shadow-sm sm:text-sm rounded-none px-4 py-2"
    />
  </div>
)
