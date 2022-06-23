import React, { useState} from 'react'
import './Search.css'
import axios from 'axios';
import Card from '../courses/Card'
import { SearchIcon } from '@heroicons/react/outline';

function Search() {

    const initialValues = { searchValue: "", searched: null};
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        setFormValues({ ...formValues, searchValue: e.target.value});
      };

    const searchHandler = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/searchCourses',
            headers: {'Content-Type': 'application/json'},
            data: formValues.searchValue
          }).then(function (response) {
              setFormValues({ ...formValues, searched: JSON.stringify(response.data)});
          });
    }

    return (
        <div>
            <div className='float-right'>
                <form onSubmit={searchHandler} >
                    <div className='d-flex'>
                        <div>
                            <input
                                className='inputTilte'
                                type="text"
                                name="search"
                                placeholder='Cauta'
                                value={formValues.searchValue}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='searchButton'>
                            <button className="searchIcon">
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </form> 
            </div>

            <div className='pt-5 my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 
                2xl:grid-cols-4  flex-wrap w-100'>
                {
                    formValues.searched &&
                    JSON.parse(formValues.searched).map(video => (
                    <div>
                            <Card key= {video.title} className='card-content'
                                title={video.title}
                                description={video.description}
                                video={video.file}
                                email={video.email}
                                data={video.data}
                                subscribers = {[]}
                                rating = {video.rating}
                            />
                    </div>
                    ))
                }
            </div>   
        </div>
        )
}

export default Search