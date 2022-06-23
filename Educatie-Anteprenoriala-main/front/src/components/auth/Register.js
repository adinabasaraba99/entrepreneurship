import React from 'react'
import { useState} from "react";
import './Auth.css'
import axios from 'axios';
import image from '../../assets/img/bottomrightimage.svg'

function Register() {
    const initialValues = { name: "",
                            surname: "",
                            email: "", 
                            password: "", 
                            conf_password: "", 
                            role: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [responseGood, setResponseGood] = useState("");
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
        url: 'http://localhost:8080/api/register',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
          name: formValues.name,
          surname: formValues.surname,
          email: formValues.email,
          password: formValues.password,
          role: formValues.role
        })
      }).then(function (response) {
        if(response.data === "You have been registered, now confirm your email!") {
            setResponseGood(response.data);
        } else {
            setResponseBad(response.data);
        }
      });
    };
    
    const validate = (values) => {
      const errors = {};
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!values.name) {
        errors.name = "Prenume incomplet!";
      }

      if (!values.surname) {
        errors.surname = "Nume incomplet!";
      }

      if (!values.email) {
        errors.email = "Email incomplet!";
      } else if (!regex.test(values.email)) {
        errors.email = "Email nevalid!";
      }

      if (!values.password) {
        errors.password = "Parola incompleta";
      } else if (values.password.length < 6) {
        errors.password = "Parola trebuie sa aiba cel putin 6 caractere!";
      }

      if (!values.conf_password) {
        errors.conf_password = "Parola incompleta";
      } else if (values.conf_password !== values.password) {
        errors.conf_password = "Parolele nu coincid!";
      }

      if (values.role.length === 0) {
        errors.role = "Nu ai selectat nimic!";
      }

      return errors;
    };

    if(responseGood === "") {
      return (
        <div className="container-register">
          <img src={image} alt='img' className={'bg-img'}/>
          <form onSubmit={handleSubmit}  className="form">

              <div className="form-title">
                <p style={{color: 'red'}}>{responseBad}</p>
                <h1>Register</h1>
              </div>

              <div className="ui-form">

                  <p style={{color: 'red'}}>{formErrors.name}</p>
                  <div className="field">
                    <input
                      type="text"
                      name="name"
                      placeholder="Prenume"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                  </div>

                  <p style={{color: 'red'}}>{formErrors.surname}</p>
                  <div className="field">
                    <input
                      type="text"
                      name="surname"
                      placeholder="Nume"
                      value={formValues.surname}
                      onChange={handleChange}
                    />
                  </div>
                
                  <p style={{color: 'red'}}>{formErrors.email}</p>
                  <div className="field">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </div>
                
                  <p style={{color: 'red'}}>{formErrors.password}</p>
                  <div className="field">
                    <input
                      type="password"
                      name="password"
                      placeholder="Parola"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                  </div>

                  <p style={{color: 'red'}}>{formErrors.conf_password}</p>
                  <div className="field">
                    <input
                      type="password"
                      name="conf_password"
                      placeholder="Confirmare Parola"
                      value={formValues.conf_password}
                      onChange={handleChange}
                    />
                  </div>

                  <p style={{color: 'red'}}>{formErrors.role}</p>
                  <div className="field-radio">
                    <input
                      className='left-input'
                      type="radio"
                      name="role"
                      value="USER"
                      onChange={handleChange}
                    /> User

                    <input
                      className='right-input'
                      type="radio"
                      name="role"
                      value="MODERATOR"
                      onChange={handleChange}
                    /> Moderator
                  </div>
    
                  <button className="fluid ui button blue">Submit</button>

                  <div className='register-button'>
                    <p>Ai deja cont?</p>
                    <a href='/login'><i>Login Now</i></a>
                  </div>
              </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="container-register">
          <img src={image} alt='img' className={'bg-img'}/>
            <form className="form">
              <div className="form-title">
                <h1>{responseGood}</h1>
              </div>

              <div className="ui-form">
                <div className='register-button'>
                  <p>Odata ce email-ul a fost confirmat vei putea face login!</p>
                  <a href='/login'><i>Now Login</i></a>
                </div>
              </div>
            </form>
        </div>
      );
    }
}

export default Register