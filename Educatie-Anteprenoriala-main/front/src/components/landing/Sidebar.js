import React from 'react'
import { AcademicCapIcon, BookmarkAltIcon, HomeIcon, LibraryIcon, LoginIcon, StarIcon, UserCircleIcon, DatabaseIcon} from "@heroicons/react/outline"
import '../landing/Sidebar.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

function Sidebar() {
  let navigate = useNavigate();

  const cookie = new Cookies();

  const routeChange = (path) => {
        navigate(path)
  }

  const routeChangeLogout = (path) => {
        cookie.remove('token', {path: "/"});
        cookie.remove('email', {path: "/"});
        cookie.remove('role', {path: "/"});
        navigate(path)
  }


  return (
    <div className='sidebar'>
        <div className='sidebar-title'>
            <AcademicCapIcon className='logo'/>
            <h2>Educatie Antreprenoriala</h2>
        </div>

        <div className='button-sidebar' onClick={() => routeChange('/')}>
            <HomeIcon className='icon-button'/>
            <p>Acasa</p>
        </div>

        { cookie.get('token') !== undefined && cookie.get('role') === 'MODERATOR' &&
        <div className='button-sidebar' onClick={() => routeChange('/profil')}>
            <UserCircleIcon className='icon-button'/>
            <p>Profil</p>
        </div>
        }

        { cookie.get('token') !== undefined && cookie.get('role') === 'ADMIN' &&
        <div className='button-sidebar' onClick={() => routeChange('/dashboard')}>
            <DatabaseIcon className='icon-button'/>
            <p>Dashboard</p>
        </div>
        }

        <div className='button-sidebar' onClick={() => routeChange('/courses')}>
            <LibraryIcon className='icon-button'/>
            <p>Cursuri</p>
        </div>

        <div className='button-sidebar'  onClick={() => routeChange('/indicatii')}>
            <BookmarkAltIcon className='icon-button'/>
            <p>Indicatii</p>
        </div>

        { cookie.get('token') !== undefined && cookie.get('role') !== 'ADMIN' &&
        <div className='button-sidebar'  onClick={() => routeChange('/favorites')}>
            <StarIcon className='icon-button'/>
            <p>Favorite</p>
        </div>
        }

        { cookie.get('token') === undefined ?
        <div className='button-sidebar'  onClick={() => routeChange('/login')}>
            <LoginIcon className='icon-button'/>
            <p>Login</p>
        </div>
        :
        <div className='button-sidebar'  onClick={() => routeChangeLogout('/')}>
            <LoginIcon className='icon-button'/>
            <p>Logout</p>
        </div>
        }
    </div>
  )
}

export default Sidebar