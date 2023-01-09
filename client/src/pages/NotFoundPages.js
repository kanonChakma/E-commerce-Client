import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/NotFoundPages.css';
import img from '../image/Not Found1.png';

const NotFoundPages = () => {
    const location = useLocation();
    return (
        <section>
            <div className="container-fluid Notfound mt-4">

                <div className="col-8 mx-auto d-flex justify-content-center notFoundImg">
                    <img src={img} className="img-fluid" alt="bg" />
                </div>
                <div className=" col-10 mx-auto pt-3">
                    <h4 className="mb-4 text-center">The page you are looking are not found</h4>
                    <p className="d-flex ml-5">
                        <span className="ml-4 text-center">This Url "{location.pathname}" are unvalid</span>
                        <Link to="/"><span className="home-btn ml-4">back home</span></Link>
                    </p>
                </div>
            </div>
        </section>
    );
};
export default NotFoundPages;