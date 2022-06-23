import React, { useState } from 'react'
import './Card.css'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Player } from 'video-react'
import Moment from 'react-moment';
import ReactStars from 'react-rating-stars-component';

function Card( {title, description, video, email, data, subscribers, rating} ) {

    const cookie = new Cookies();

    const handleSubscribe = async (e) => {
        const token = cookie.get('token');

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/subscribe',
            headers: {'Content-Type': 'application/json',
                        "Authorization": "Bearer " + token
                    },
            data: JSON.stringify({
                subscriber: cookie.get('email'),
                moderator: email,
            })
        }).then((resp) => {
            console.log(resp)
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        });
    }

    const handleUnSubscribe = async (e) => {
        const token = cookie.get('token');
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/unsubscribe',
            headers: {'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
            },
            data: JSON.stringify({
                subscriber: cookie.get('email'),
                moderator: email,
            })
        }).then((resp) => {
            console.log(resp)
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        });
    }

    const handleRating = async (e) =>  {
        const token = cookie.get('token');
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/rateCourse',
            headers: {  'Content-Type': 'application/json',
                        "Authorization": "Bearer " + token
                    },
            data: JSON.stringify({
                emailUser: cookie.get('email'),
                email: email,
                title: title,
                rating: e
            })
        }).then((resp) => {
            console.log(resp)
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        });
    }

    const handleDelete = async (title, email) => {
        const token = cookie.get('token');
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/deleteCourse',
            headers: {'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
            },
            data: JSON.stringify({
                email: email,
                title: title,
            })
        }).then( (resp) => {
            console.log(resp)
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
    <div>
        <link
            rel="stylesheet"
            href="https://video-react.github.io/assets/video-react.css"
        />

        <div className='card my-3'>
            <Player className='card-player' playsInline src = {video} />
            <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
                <p className='card-text'>{description}</p>
                
                {
                    (cookie.get("token") !== undefined &&
                    cookie.get("role") === "ADMIN" &&
                    <div  className='subscribe-buttom d-inline-flex' onClick={() => handleDelete(title, email)}>
                        Sterge video!
                    </div>)

                    ||

                    (cookie.get("token") !== undefined &&
                    email !== cookie.get("email") &&
                    !subscribers.includes(email) && 
                    <div  className='subscribe-buttom d-inline-flex' onClick={handleSubscribe}>
                        Aboneaza-te!
                    </div>)
                    
                    ||

                    (cookie.get("token") !== undefined &&
                    email !== cookie.get("email") &&
                    subscribers.includes(email) && 
                    <div  className='subscribe-buttom d-inline-flex'  onClick={handleUnSubscribe}>
                        Dezaboneaza-te!
                    </div>)
                }
                <div className='card-footer'>
                    <p className='card-email'>{email}</p>
                    <p className='card-date'>
                        <i><Moment toNow>{data}</Moment></i>
                    </p>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div>
                            {
                                (   cookie.get("token") !== undefined &&
                                    <ReactStars
                                        value={rating}
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                        isHalf={true}
                                        onChange={handleRating}
                                        classNames='react-stars'
                                    />)
                            }
                        </div>

                        <div className='mx-5'>
                            {rating.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card