import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import '../../common/index.scss';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
// import ThemeSettings from "../../common/theme-settings";

// Import custom components
import TopCollection from "../common/collection"
import HeaderOne from "../../common/headers/header-one"
import FooterOne from "../../common/footers/footer-one"
import Instagram from "../common/instagram"
import LogoBlock from "../common/logo-block"
import MultiSlider from "./multiple-slider";
import UserProfile from "../../../usercookie";
import Cookies from 'universal-cookie';
import { user } from 'fetch-instagram/build';

const cookies = new Cookies();

var username = cookies.get('username');


class Kids extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color10.css` );
    }

    clicked = () =>{
    console.log(UserProfile.getName());
    console.log(cookies.get('username'));
    } 
    render(){ 

        return (
            <div> 
                <Helmet>
                    <title>Old Mutual Online Brand Shop</title>
                </Helmet>
                <HeaderOne logoName={'logo/logo.png'}/>

                <section className="p-0">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home21 text-center p-right" >
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h2>Hey {username}</h2>
                                                    <br></br>
                                                    <h2>We've got the perfect</h2>
                                                    <h1>Collection</h1>
                                                    <h2>for you</h2>
                                                    <a href="http://10.70.12.38:3001/left-sidebar/collection" className="btn btn-solid" onClick={this.clicked}>shop now</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home22 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>30% off</h4>
                                                    <h1>lowest price</h1><a href="http://10.70.12.38:3001/left-sidebar/collection" className="btn btn-solid">shop now</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                {/*collection banner layout*/}
                <section className="banner-padding absolute-banner pb-0 ratio2_1">
                    <div className="container absolute-bg">
                        <div className="row partition2">
                            <div className="col-md-6">
                                <a href="http://10.70.12.38:3001/left-sidebar/collection">
                                    <div className="collection-banner p-right text-center">
                                        <div>
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/kids/2.jpg`}
                                                 className="img-fluid  bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner">
                                            <div>
                                                <h4>save 30%</h4>
                                                <h2>Tshirts</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6">
                                <a href="http://10.70.12.38:3001/left-sidebar/collection">
                                    <div className="collection-banner p-right text-center">
                                        <div>
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/kids/1.jpg`}
                                                 className="img-fluid blur-up lazyload bg-img" alt="" />
                                        </div>
                                        <div className="contain-banner">
                                            <div>
                                                <h4>save 60%</h4>
                                                <h2>Accessories</h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/*collection banner layout end*/}

                {/*Product slider*/}
                <TopCollection type={'kids'} />
                {/*Product slider End*/}

                {/*Parallax banner*/}
                <section className="p-0">
                    <div className="full-banner parallax parallax-banner11 text-center p-left">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="banner-contain">
                                            <h2>2021</h2>
                                            <h3>top trends</h3>
                                            <h4>special offer</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </section>
                {/*Parallax banner end*/}

                {/*Product Slider*/}
                <MultiSlider type={'kids'} />
                {/*Product Slider End*/}

                {/*Instagram Section*/}
                {/* <Instagram /> */}
                {/*Instagram Section End*/}

                {/* Logo Block Section*/}
                {/* <LogoBlock /> */}
                {/* Logo Block Section End*/}
                <br></br>

                <FooterOne logoName={'logo/logo.png'}/>

                {/* <ThemeSettings /> */}
            </div>
        )
    }
}


export default Kids;