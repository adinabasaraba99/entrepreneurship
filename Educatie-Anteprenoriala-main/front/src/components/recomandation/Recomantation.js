import React from 'react'
import {Carousel} from '3d-react-carousal';
import Sidebar from '../landing/Sidebar'
import image from '../../assets/img/bottomrightimage.svg'
import recom1 from '../../assets/img/recom1.jpg'
import recom2 from '../../assets/img/recom2.jpg'
import recom3 from '../../assets/img/recom3.jpg'
import recom4 from '../../assets/img/recom4.jpg'
import recom5 from '../../assets/img/recom5.jpg'
import recom6 from '../../assets/img/recom6.jpg'
import recom7 from '../../assets/img/recom7.jpg'
import recom8 from '../../assets/img/recom8.jpg'
import './Recomandation.css'

function Recomantation() {
    let slides = [
        <img  src={recom1} alt="1" />,
        <img  src={recom2} alt="2" />,
        <img  src={recom3} alt="3" />,
        <img  src={recom4} alt="4" />,
        <img src={recom5} alt="5" />,
        <img src={recom6} alt="6" />,
        <img src={recom7} alt="7" />,
        <img src={recom8} alt="8" />
    ];
  
    return (
        <div>
            <img src={image} alt='img' className={'bg-img'}/>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
            
            <main className='d-flex'>
                <div className='col-2'>
                    <Sidebar />
                </div>

                <div className='col-10 float-right'>
                    <div className='books d-flex align-items-center'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-6 d-flex flex-column justify-content-center'>
                                    <h3>
                                        Educația antreprenorială cultivă talente inovatoare, care reprezintă o forță
                                        importantă pentru dezvoltarea viitoare
                                    </h3>
                                
                                    <p>
                                        De ce antreprenoriatul este relevant pentru educație a fost văzut până acum în primul rând din
                                        punct de vedere economic. Acest lucru a funcționat destul de bine pentru cursurile opționale la 
                                        nivel de învățământ superior, dar este mai problematic pentru nivelurile primare și secundare ale 
                                        educației pentru elevi.
                                        Elevii pot devenii foarte motivati și implicati prin crearea de valoare pe baza cunoștințelor pe 
                                        care le dobândesc, iar acest lucru poate alimenta învățarea profundă și poate ilustra relevanța 
                                        practică a cunoștințelor în cauză.
                                        O astfel de abordare are implicații de anvergură asupra modului de planificare, execuție și evaluare 
                                        a antreprenoriatului în educație. 
                                    </p>
                                </div>

                                <div className='col-lg-6 d-flex flex-column justify-content-center h-100 m-0'>
                                    <Carousel slides={slides} className='carousel-img' autoplay={true} interval={4000}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='text d-flex align-items-center'>
                        <div className='m-20'>
        
                            <h3>Entrepreneurship education - Gustav Hägg </h3>
                            <p>
                                Educația antreprenorială cultivă talente inovatoare, care reprezintă o forță motrice importantă pentru 
                                dezvoltarea viitoare. În prezent, strategiile de dezvoltare bazate pe inovare impun noi cerințe educației 
                                antreprenoriale. 

                                În prezent, strategiile de dezvoltare bazate pe inovare impun noi cerințe educației antreprenoriale. Cu toate acestea, cea mai mare parte a cercetării 
                                și discuțiilor actuale în acest domeniu se concentrează pe construcția personalului didactic în ecosistemul educației antreprenoriale (Ruskovaara și 
                                Pihkala, 2015), pe dezvoltarea curriculumului (Falck et al., 2016) și pe dacă educația antreprenorială poate influența Intenția de antreprenoriat 
                                (Martin și colab., 2013; Pittaway și Cope, 2016). Pe baza teoriei cognitive sociale, trăsăturile individuale și mediul învățătoare influențează foarte 
                                mult realizarea educației antreprenoriale. Studiul aprofundat al mecanismului educației antreprenoriale, care stimulează inovarea și dezvoltarea, poate 
                                îmbunătăți și mai mult cercetarea în domeniul educației antreprenoriale (Baum et al., 2001; Morris et al., 2013).
                            </p>

                            <h3> Entrepreneurhip education at universities - Christine K. Volkmann, David B. Audretsch</h3>
                            <p>
                                Acest volum discută despre educația antreprenorială în Europa pe baza unor studii de caz aprofundate ale 
                                activităților conexe la douăzeci de instituții de învățământ superior. Pe baza unui model de educație antreprenorială, 
                                analiza abordează predarea curriculară și extracurriculară, precum și contextul instituțional și al părților 
                                interesate de furnizare a educației antreprenoriale în cadrul instituțiilor de învățământ superior. 
                            </p>

                            <h3>Fii Antreprenor - UPB</h3>
                            <p>
                                Ajuns la cea de-a 5-a ediție, programul „Fii Antreprenor” este dezvoltat să ajute la transformarea studenților din UPB 
                                în superantreprenori.
                            </p>
                            <a href='https://upb.ro/fii-antreprenor-5-0/'>https://upb.ro/fii-antreprenor-5-0</a>


                            <h4>Curs Antreprenoriat - Ateliere ILBAH</h4>
                            <p> 
                            Cursul de Antreprenoriat este recomandat tuturor celor care isi doresc sa porneasca pe drumul libertatii, dar si al sacrificiilor, asigurate de statutul de antreprenor.
                            Absolvind cursul de Antreprenoriat organizat de Atelierele ILBAH, vei obtine o diploma autorizata de Ministerul Muncii si Ministerul Educatiei recunoscuta atat la nivel 
                            national, cat si international.
                            </p>
                            <a href='https://www.ateliereleilbah.ro/cursuri/curs-antreprenoriat-de-la-a-la-z-competente-antreprenoriale/'>https://www.ateliereleilbah.ro/cursuri/curs-antreprenoriat-de-la-a-la-z-competente-antreprenoriale/</a>

                            <h5>The next generation of innovators - Garrett</h5>
                            <p>
                            Aplică la workshop-urile “The next generation of innovators”, un program educaţional şi de mentorat dezvoltat de Garrett Motion și Fundația Leaders, prin care îţi vei dezvolta 
                            atât abilităţile de comunicare şi leadership, cât și cunoştinţele în domenii precum Data Science, Inteligență Artificială și Machine Learning.
                            </p>
                            <a href='https://www.garrettmotion.com/careers/romania/romania-3/cariere-la-garrett/the-next-generation-of-innovators/'>https://www.garrettmotion.com/careers/romania/romania-3/cariere-la-garrett/the-next-generation-of-innovators/</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Recomantation
