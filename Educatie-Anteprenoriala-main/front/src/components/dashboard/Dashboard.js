import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import image from '../../assets/img/bottomrightimage.svg'
import Sidebar from '../landing/Sidebar'
import './Dashboard.css'


function Dashboard() {
    const [users, setUsers] = useState([])
    const cookie = new Cookies();
    let token = cookie.get('token');

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/loadAllUsers',
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(function (resp) {
            setUsers(resp.data)
        });
    }, [])

    const handleDelete = (e) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/deleteUser',
            headers: {'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        data: JSON.stringify({
            email: e
        })
        }).then( (resp) => {
            window.location.reload(false);
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
                    <h1 className='mx-5 mt-10'>Lista utilizatori:</h1>

                    <div className='mx-5 mt-10'>
                        {
                            users.map((user, index) => (
                                <div className='d-flex'>
                                    <p className='user-index'>{index}.</p>
                                    <p className='user-email col-5'>{user}</p>
                                    <div className='subscribe-buttom d-inline-flex'  onClick={() => handleDelete(user)}>
                                        Sterge utilizator!
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

export default Dashboard