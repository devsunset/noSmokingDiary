import React from 'react';

function FormTextarea({label, name, error, value, onChange, type = "text"}) {
  return <div>
            <label className="block mb-2 text-indigo-500" htmlFor={name}>{label}</label>
            <textarea
                type={type} 
                name={name}
                rows="10"
                onChange={onChange}
                className={`rounded w-full p-2 border-b-2 ${!error ? "mb-6 border-indigo-500 " : "border-red-500 "} text-indigo-700 outline-none focus:bg-gray-300`}
            >{value}</textarea>
            {error && <span className='mb-3 text-red-500' >{error}</span>}
        </div>
}

export default FormTextarea;
