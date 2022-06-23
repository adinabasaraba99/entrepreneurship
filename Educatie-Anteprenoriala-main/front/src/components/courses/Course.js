import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../landing/Sidebar'
import './Course.css'
import image from '../../assets/img/bottomrightimage.svg'
import Card from './Card'
import Cookies from 'universal-cookie';
import axios from 'axios';
import UploadCourse from './UploadCourse'
import Search from '../search/Search'


function Course() {
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/loadCourses',
        }).then(function (resp) {
            localStorage.setItem("videos",  JSON.stringify(resp.data));
        });
    }, [])

    const cookie = new Cookies();
    let email = cookie.get("email");
    let token = cookie.get('token');
    const [isReady, setIsReady] = useState(false)
        
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/getAllSubscribers?email=${email}`,
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(function (response) {
                localStorage.setItem("subs",  JSON.stringify(response.data));
                setIsReady(true);
        }).catch((err) =>
            setIsReady(true)
        );
    }, [email, token])

  return (
    <div>
        <img src={image} className={'bg-img'} alt={"img"}/>
        
        <main className='d-flex'>
            <div className='col-2'>
                <Sidebar />
            </div>
            <div className='col-10 justify-content-center'>
                <div className='mx-10 mt-10'>
                    <Search/>
                </div>
                <UploadCourse />
                <div className='course mt-10 px-5'>
                    Marketing
                </div>
                <div className='px-5 my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 
                2xl:grid-cols-4  flex-wrap'>
                    {   isReady &&
                        JSON.parse(localStorage.getItem("videos"))[1].map(video => (
                            <div>
                                <Card key= {video.title}  className='card-content'
                                    title={video.title}
                                    description={video.description}
                                    video={video.file}
                                    email={video.email}
                                    data={video.data}
                                    subscribers = {JSON.parse(localStorage.getItem("subs"))}
                                    rating = {video.rating}
                                />
                            </div>
                        ))
                    }

                </div>

                <div className='course mt-10 px-5'>
                    Crypto
                </div>
                <div className='px-5 my-3 sm:grid md:grid-cols-2 xl:grid-cols-3 
                2xl:grid-cols-4  flex-wrap'>
                     {  isReady &&
                        JSON.parse(localStorage.getItem("videos"))[0].map(video => (
                            <Card key = {video.title} className='card-content'
                                title={video.title}
                                description={video.description}
                                video={video.file}
                                email={video.email}
                                data={video.data}
                                subscribers = {JSON.parse(localStorage.getItem("subs"))}
                                rating = {video.rating}
                            />
                        ))  
                    }
                </div>
                <div className='course mt-10 px-5'>
                    Inovatii
                </div>
                <div className='px-5 my-3 sm:grid md:grid-cols-2 xl:grid-cols-3 
                2xl:grid-cols-4  flex-wrap'>
                     {  isReady &&
                        JSON.parse(localStorage.getItem("videos"))[2].map(video => (
                            <Card key= {video.title} className='card-content'
                                title={video.title}
                                description={video.description}
                                video={video.file}
                                email={video.email}
                                data={video.data}
                                subscribers = {JSON.parse(localStorage.getItem("subs"))}
                                rating = {video.rating}
                            />
                        ))  
                    }
                </div>
                <div className='course mt-10 px-5'>
                    Investitii
                </div>
                <div className='px-5 my-3 sm:grid md:grid-cols-2 xl:grid-cols-3 
                2xl:grid-cols-4  flex-wrap'>
                     {  isReady &&
                        JSON.parse(localStorage.getItem("videos"))[3].map(video => (
                            <Card key= {video.title} className='card-content'
                                title={video.title}
                                description={video.description}
                                video={video.file}
                                email={video.email}
                                data={video.data}
                                subscribers = {JSON.parse(localStorage.getItem("subs"))}
                                rating = {video.rating}
                            />
                        ))  
                    }
                </div>
            </div>
        </main>
    </div>
  )
}

export default Course