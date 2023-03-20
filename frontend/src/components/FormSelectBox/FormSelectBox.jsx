import React from 'react';


function FormSelectBox({label, name, error, value, onChange}) {
  return <div>
            <label className="block mb-2 text-indigo-500" htmlFor={name}>{label}</label>
            <select  onChange={onChange} className="block mb-2 text-indigo-500">
                <option value="Good" defaultValue={value === 'Good'}>Good</option>
                <option value="Bad" defaultValue={value === 'Bad'}>Bad</option>
            </select>
            {error && <span className='mb-3 select-red-500' >{error}</span>}
        </div>
}

export default FormSelectBox;


