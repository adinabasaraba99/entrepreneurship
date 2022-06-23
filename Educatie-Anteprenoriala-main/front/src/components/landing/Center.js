import React, { useRef } from 'react'
import { Rotate, Zoom } from 'react-awesome-reveal'
import './Center.css'
import heroimg from '../../assets/img/hero-img.svg'
import about1 from '../../assets/img/cine-suntem.svg'
import about2 from '../../assets/img/ce-ne-propunem.svg'
import about3 from '../../assets/img/ce-oferim.svg'

function Center() {
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
    const ref = useRef(null)
    const executeScroll = () => scrollToRef(ref)

    return (
      <div>
        <div className='hero d-flex align-items-center'>
            <div className='container'>
                <div className="row">
                    <div className='col-lg-6 d-flex flex-column justify-content-center'>
                        <Rotate>
                            <h1>Educatie Antreprenoriala</h1>
                        </Rotate>
                        <h2>Educația antreprenorială este unul dintre domeniile cu cea mai rapidă creștere din lume, cu un interes crescut pentru capacitatea sa de a lega practicile actuale de afaceri cu teoria academică. </h2>
                        <div>
                            <div className='text-center text-lg-start mt-10'>
                                <div onClick={executeScroll} className='hero-buttom scrollto d-inline-flex align-items-center justify-content-center align-self-center'>
                                    Get Started
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <Zoom>
                            <img src={heroimg} className='hero-img' alt=""/>
                        </Zoom>
                    </div>
                </div>
            </div>
         </div>

         <div ref={ref} className='about d-flex align-items-center'>
            <div className="container">
                <header className="about-header">
                    <h2>Despre noi</h2>
                </header>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="box">
                            <img src={about1} alt={"img"}/>
                            <h3>Cine suntem?</h3>
                            <p>Suntem un grup de ingineri care înceară să promoveze educația antreprenorială în randul tinerilor.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="box">
                            <img src={about2} alt={"img"} />
                            <h3>Ce ne propunem?</h3>
                            <p>Ne propunem dobandirea de cunostiinte practice, fresh, care pot fi implementate la nivelul pieței.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="box">
                            <img src={about3} alt={"img"}/>
                            <h3  className='pt-20'>Ce va oferim?</h3>
                            <p>Oferim o platformă pe care se pot încarca cursuri pentru studiul criptomonedelor, pentru înțelegerea marketingului si alte programe disponibile pentru promovarea educației antreprenoriale.</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    )
}

export default Center
