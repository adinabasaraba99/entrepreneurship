import React from 'react'
import image from '../../assets/img/bottomrightimage.svg'
import Sidebar from '../landing/Sidebar'
import './Favorites.css'
import {UserCircleIcon} from "@heroicons/react/solid"
import { useEffect, useState} from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Player } from 'video-react'
import Moment from 'react-moment';
import ReactStars from 'react-rating-stars-component';

function Favorites() {
  const cookie = new Cookies();
  let token = cookie.get('token');
  let email = cookie.get('email');
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/loadAllFavorites?email=${email}`,
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(function (resp) {
      localStorage.setItem("favorites",  JSON.stringify(resp.data));
      setIsReady(true)
    }).catch((err) => {
      setIsReady(true)
    });
  }, [])

  const handleUnSubscribe = (e) => {
    const token = cookie.get('token');
      
    axios({
        method: 'post',
        url: 'http://localhost:8080/api/unsubscribe',
        headers: {'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
        },
        data: JSON.stringify({
            subscriber: cookie.get('email'),
            moderator: e,
        })
    }).then((resp) => {
      window.location.reload(false)
    }).catch((err) => {
      window.location.reload(false)
    });
  };
  
  return (
    <div>
      <img src={image} alt='img' className={'bg-img'}/>
      
      <main className='d-flex'>
        <div className='col-2'>
          <Sidebar />
        </div>
        <div className='col-10 float-right'>
          <h1 className='mx-5 mt-10'>Cursuri favorite:</h1>

          {
          isReady &&
          localStorage.getItem("favorites") &&
          Object.keys(JSON.parse(localStorage.getItem("favorites"))).map((key) => (
            <div>
              <div className='d-flex align-items-center mt-20 px-5'>
                <UserCircleIcon className='usericon mr-3'/>
                <p className='user-email mb-0 mr-5'>{key}</p>
                <div  className='subscribe-buttom d-inline-flex'  onClick={() => handleUnSubscribe(key)}>
                        Dezaboneaza-te!
                </div>
              </div>
              <div className='px-5 my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 
                      2xl:grid-cols-4 flex-wrap'>
                {JSON.parse(localStorage.getItem("favorites"))[key].map((video) =>
                      <div>
                        <link
                            rel="stylesheet"
                            href="https://video-react.github.io/assets/video-react.css"
                        />

                        <div className='card mb-5'>
                            <Player className='card-player' playsInline src = {video.file} />
                            <div className='card-body'>
                                <h5 className='card-title'>{video.title}</h5>
                                <p className='card-text'>{video.description}</p>
                                <div className='card-footer'>
                                    <p className='card-email'>{video.email}</p>
                                    <p className='card-date'>
                                        <i><Moment toNow>{video.data}</Moment></i>
                                    </p>
                                    
                                    <ReactStars
                                        value={video.rating}
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                        edit={false}
                                        classNames='react-stars'
                                    />
                                </div>
                            </div>
                        </div>

                      </div>
                )}
              </div>
            </div>  
            ))}
        </div>
      </main>
  </div>
  )
}

export default Favorites