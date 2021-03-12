import React from 'react'
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignup = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
      submitForm,
      validate
    );
  
    return (
      <div className='form-content-right'>
        <form onSubmit={handleSubmit} className='form' noValidate>
          <h1>
            Please Submit Credit Card Information
          </h1>
          <div className='form-inputs'>
            <label className='form-label'>Your name</label>
            <input
              className='form-input'
              name="name"
              component="input"
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Card Number</label>
            <input
              className='form-input'
              name="number"
              type="text"
              pattern="[\d| ]{16,22}"
              placeholder="Card Number"
              value={values.number}
              onChange={handleChange}
            />
            {errors.number && <p>{errors.number}</p>}
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Card Type (enter a valid type, no special cases, characters or spaces</label>
            <input
              className='form-input'
              name="credittype"
              type="text"
              placeholder="Credit Card Type"
              value={values.credittype}
              onChange={handleChange}
            />
            {errors.credittype && <p>{errors.credittype}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Expiration "MM/YY"</label>
            <input
            
              className='form-input'
              name="expiry"
              type="text"
              pattern="\d\d/\d\d"
              placeholder="Valid Thru"
              value={values.expiry}
              onChange={handleChange}
            />
            {errors.expiry && <p>{errors.expiry}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>cvc</label>
            <input
            
              className='form-input'
              name="cvc"
              type="text"
              pattern="\d{3,4}"
              placeholder="CVC"
              value={values.cvc}
              onChange={handleChange}
            />
            {errors.cvc && <p>{errors.cvc}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Postal/Zip Code</label>
            <input
            
              className='form-input'
              name="mailcode"
              type="text"
              placeholder="Postal/Zip Code"
              value={values.mailcode}
              onChange={handleChange}
            />
            {errors.mailcode && <p>{errors.mailcode}</p>}
          </div>

          <button className='form-input-btn' type='submit'>
            Submit Purchase Request
          </button>
          
        </form>
      </div>
    );
  };

export default FormSignup
