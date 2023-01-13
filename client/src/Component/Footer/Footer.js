import { faFacebookF, faGooglePlusG, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import './Footer.css';
import FooterColumn from './FooterColumn';

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
        {name: "Gift Certificates" , link: "/checkup"},
        {name: "Affiliate" , link: "/checkup"},
        {name: "Specials" , link: "/checkup"}
    ]
    const services = [
        {name: "My Account" , link: "/user/history"},
        {name: "Oder history" , link: "/user/history"},
        {name: "Wish List" , link: "/user/wishlist"},
        {name: "Newsletter" , link: "/newsletter"}
    ]
    return(
        <footer className="footer">
        <Container
        my={5}
        maxWidth="lg">
            <Grid 
              container
              justifyContent="space-between"
              >
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
          </Grid>
       </Container>
       </footer> 
    );
};
export default Footer;

// <div className="text-center copyright">
// <p>Powered by trustified</p>
// <p>Copyright {(new Date()).getFullYear()}</p>
// </div>


