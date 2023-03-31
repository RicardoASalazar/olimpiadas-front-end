import React from 'react';
import img1 from '../assets/images/facebook.jpg';
import img2 from '../assets/images/twitter.png';
import img3 from '../assets/images/instagram.png';

const FooterComponent = () => {
    return (
        <div className='footer-container'>
            <span>Derechos reservados de autor  2023</span>
            <span>Aviso de privacidad</span>
            <img src={img1} alt="" className='footer-img'/>
            <img src={img2} alt="" className='footer-img'/>
            <img src={img3} alt="" className='footer-img'/>
        </div>
    );
};

export default FooterComponent;