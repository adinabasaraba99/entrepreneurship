import React, { useState } from 'react'
import axios from 'axios';
import Collapsible from 'react-collapsible';
import Cookies from 'universal-cookie';
import './Course.css'

function UploadCourse() {
    const initialValues = { title: "",
                            description: "",
                            viz: false,
                            isFilePicked: false,
                            type: "marketing",
                            file: null};
                            
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    let isError = false;
    const [response, setResponse] = useState("");

    const cookie = new Cookies();
    let token = cookie.get('token');

    const handleChangeFile = (e) => {
        setFormValues({ ...formValues, file: e.target.files[0] });
    };

    const handleTitle = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleDescription = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleType = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (e) => {
        const errors = {}

        if (!formValues.title) {
            errors.title = "Titlu incomplet!"
            isError = true;
        }

        if (!formValues.description) {
            errors.description = "Descriere incompleta!"
            isError = true;
        }

        if (!formValues.file) {
            errors.file = "Nu ati incarcat nimic!"
            isError = true;
        }

        return errors;
    }

    const uploadVideo = (e) => {
        e.preventDefault()
        setFormErrors(validate())

        if(isError === false) {
            let formdata = new FormData()
            formdata.append('file', formValues.file)
            formdata.append('email', cookie.get('email'))
            formdata.append('title', formValues.title)
            formdata.append('description', formValues.description)
            formdata.append('type', formValues.type)
    
            const token = cookie.get('token');
    
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/uploadCourse',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token
                },
                data: formdata
            }).then(function (resp) {
                    if(resp.data === "SUCCESS") {
                        setFormValues(initialValues);
                    }
                    setResponse(resp.data);
                    window.location.reload(false);
            }).catch((err) => {
                console.log(err)
            });
        }

    }

    return (
        <div>
            {response === "SUCCESS" &&
            <div>
                <p className='response'>"Videoclipul s-a uloadat cu successuri bravo"</p>
            </div>
            }
            {cookie.get('role') === "MODERATOR" && 
            <Collapsible transitionTime={200} className='collapsible' trigger={
                    <button className='uploadbutton' onClick={() => {setFormValues({ ...formValues, viz: true });setResponse("")}}>
                        Incarca un video
                    </button>
                    }>
                
                {formValues.viz &&
                <div className='px-5 col-5'>
                    <form onSubmit={uploadVideo} >
                        <div className='row formCollapsible'>
                            <p style={{color: 'red'}}>{formErrors.title}</p>
                            <label className='mb-2'>Titlu:</label>
                            <input
                                className='inputTilte'
                                type="text"
                                name="title"
                                value={formValues.title}
                                onChange={handleTitle}
                            />

                            <p style={{color: 'red'}}>{formErrors.description}</p>
                            <label className='mb-2'>Descriere:</label>
                            <textarea
                                    className='mb-4'
                                    type="text"
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleDescription}
                            />

                            <div className='col mb-2 typeCollapsible'>
                                <label className='mb-2'>Tipul:</label>

                                <select className='ml-10 selectCollapsible'
                                    value={formValues.type}
                                    name='type'
                                    onChange={handleType}
                                >
                                    <option value="marketing">Marketing</option>
                                    <option value="crypto">Crypto</option>
                                    <option value="investitii">Investitii</option>
                                    <option value="inovatii">Inovatii</option>
                                </select>
                            </div>

                            <p style={{color: 'red'}}>{formErrors.file}</p>
                            <label className='mb-2'>Incaraca un video:</label>
                            <input 
                                className='mb-4'
                                type="file"
                                name='file'
                                onChange={handleChangeFile}
                            />
                        </div>

                        <div>
                            <button className="fluid ui buttonCollapsible blue">Submit</button>
                        </div>
                    </form>    
                </div>
                }
            </Collapsible>
            }
        </div>
    )
}

export default UploadCourse