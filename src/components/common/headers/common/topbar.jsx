import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'
import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";



const cookies = new Cookies();


var username = '';

if(cookies.get('username') !== undefined){
 username = cookies.get('username'); 
}


class TopBar extends Component {

constructor(){
    super();
}

    logoutHandler =()=>{
        cookies.remove('username',{ path: '/' });
        cookies.remove('loggedIn',{ path: '/' });
        this.props.histroy.push("/");
    }

    render() {
        const {translate} = this.props;
        return (
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                <li>Welcome to the Old Mutual Brand Store</li>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{translate('call_us')}:  (263) 778 303 153</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
                                <li className="mobile-wishlist compare-mobile"><Link to={`${process.env.PUBLIC_URL}/compare`}><i className="fa fa-random" aria-hidden="true"></i>{translate('compare')}</Link></li>
                                <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
                                <li className="onhover-dropdown mobile-account">
                                    <i className="fa fa-user" aria-hidden="true"> Hey {username}</i> 
                                    <ul className="onhover-show-div">
                                        <li>
                                            <Link  to="/" data-lng="en" onClick={this.logoutHandler}>Logout</Link>
                                        </li>
                                        {/* <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/register`} data-lng="en">Register</Link>
                                        </li> */}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(withTranslate(TopBar));