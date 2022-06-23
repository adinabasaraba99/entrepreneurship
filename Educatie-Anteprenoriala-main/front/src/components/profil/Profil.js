import React from 'react'
import Sidebar from '../landing/Sidebar'
import './Profil.css'
import image from '../../assets/img/bottomrightimage.svg'
import { useEffect, useState} from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Card from '../courses/Card';
import throttle from 'lodash.throttle';

function Profil() {
  const cookie = new Cookies();
  let token = cookie.get('token');
  let email = cookie.get('email');
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/loadMyCourses?email=${email}`,
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then(function (resp) {
      localStorage.setItem("profiles", JSON.stringify(resp.data));
      setIsReady(true)
    }).catch((err) => {
      setIsReady(true)
    });
  }, [])

  const handleDelete = (e) => {
      const token = cookie.get('token');
      
      axios({
          method: 'post',
          url: 'http://localhost:8080/api/deleteCourse',
          headers: {'Content-Type': 'application/json',
          "Authorization": "Bearer " + token
        },
        data: JSON.stringify({
            email: cookie.get('email'),
            title: e,
        })
      }).then( (resp) => {
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
          <h1 className='mx-5 mt-10'>Cursurile mele:</h1>

          <div className='px-5 my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 
                  2xl:grid-cols-4  flex-wrap'>
            {
            isReady &&
            localStorage.getItem("profiles") &&
            JSON.parse(localStorage.getItem("profiles")).map(video => (
                  <div>
                      <Card key= {video.title} className='card-content'
                          title={video.title}
                          description={video.description}
                          video={video.file}
                          email={video.email}
                          data={video.data}
                          subscribers = {[]}
                          rating={video.rating}
                      />
                      <div  className='subscribe-buttom d-inline-flex mb-5'  onClick={() => handleDelete(video.title)}>
                          Sterge videoclipul!
                      </div>
              </div>
            ))
          }
          </div> 
        </div>
      </main>
  </div>
  )
}

export default Profil