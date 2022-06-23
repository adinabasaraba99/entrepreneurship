import React from 'react'
import { useState} from 'react';
import axios from 'axios';
import './Auth.css'
import image from '../../assets/img/bottomrightimage.svg'
import Cookies from 'universal-cookie';

function Login() {
    const initialValues = { email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const cookies = new Cookies();
    const [responseBad, setResponseBad] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);

      axios({
        method: 'post',
        url: 'http://localhost:8080/api/login',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
          username: formValues.email,
          password: formValues.password,
        })
      }).then(function (response) {
        if(response.data === "Incorrect username or password") {
          setResponseBad(response.data);
        } else {
          cookies.set('token',  response.data.jwt, { path: '/' });
          cookies.set('email',  response.data.email, { path: '/' });
          cookies.set('role',  response.data.role, { path: '/' });
          window.location = '/';
        }
      });
    };
    
    const validate = (values) => {
      const errors = {};
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
      if (!regex.test(values.email)) {
        errors.email = "Email nevalid!";
      }

      if (!values.password) {
        errors.password = "Parola incompleta";
      }

      return errors;
    };
  
    return (
      <div className="container-login">
        <img src={image} alt='img' className={'bg-img'}/>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-title">
            <p style={{color: 'red'}}>{responseBad}</p>
            <h1>Login</h1>
          </div>
          <div className="ui-form">
            <div className="field">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p style={{color: 'red'}}>{formErrors.email}</p>
            
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Parola"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p style={{color: 'red'}}>{formErrors.password}</p>
            
            <button className="fluid ui button blue">Submit</button>

            <div className='register-button'>
              <p>Nu ai deja cont?</p>
              <a href='/register'><i>Creaza acum</i></a>
            </div>
          </div>
        </form>
      </div>
    );
}

export default Login