import React from 'react';
import FooterColumn from './FooterColumn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'

const Footer =()=> {
    const information = [
        {name: "About us" , link: "/about"},
        {name: "Delivery Information" , link: "/deliver-info"},
        {name: "Privacy Policy" , link: "/personal-treatment"},
        {name: "Terms & Condition" , link: "/term-condition"},
    ]
    const ourAddress = [
        {name: "Contact Us" , link: "/contact"},
        {name: "Returns" , link: "/return"},
        {name: "Site Map" , link: "/site-map"},
       
    ]
    const oralHealth = [
        {name: "Brands" , link: "/checkup"},
        {name: "Gift Certicates" , link: "/checkup"},
        {name: "Affiliate" , link: "/checkup"},
        {name: "Specia;s" , link: "/checkup"}
    ]
    const services = [
        {name: "My Account" , link: "/user/account"},
        {name: "Oder history" , link: "/user/history"},
        {name: "Wish List" , link: "/wishlist"},
        {name: "Newsletter" , link: "/newsletter"}
    ]
    return(
        <footer className="footer">
           <div className="container mt-5 pt-5">
                <div className="row">
                    <FooterColumn menuTitle="Information" menuItem={information}></FooterColumn>
                    <FooterColumn menuTitle="Customer Services" menuItem={ourAddress}></FooterColumn>
                    <FooterColumn menuTitle="Extras" menuItem={oralHealth}></FooterColumn>
                    <FooterColumn menuTitle="My Account" menuItem={services}>
                       <ul className="social-media list-inline">
                           <li  className="list-inline-item"><a href="https://facebook.com" rel="noreferrer" target="_blank"><FontAwesomeIcon className="icon active-icon" icon={faFacebookF}/></a> </li>
                           <li  className="list-inline-item"><a href="https://google.com" rel="noreferrer" target="_blank"><FontAwesomeIcon className="icon active-icon" icon={faGooglePlusG}/></a></li>    
                           <li  className="list-inline-item"><a href="https://instagram.com" rel="noreferrer" target="_blank"><FontAwesomeIcon className="icon active-icon" icon={faInstagram}/></a></li>  
                        </ul>    
                    </FooterColumn>
                </div>
                <div className="text-center copyright">
                    <p>Powered by trustified</p>
                    <p>Copyright {(new Date()).getFullYear()}</p>
                 </div>
           </div>
        </footer>
    );
};
export default Footer;


