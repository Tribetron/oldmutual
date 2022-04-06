import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import { IntlActions } from 'react-redux-multilingual'
import Pace from 'react-pace-progress'

// Import custom components
import store from '../../../store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBarDark from "./common/topbar-dark";
import {changeCurrency} from '../../../actions'
import {connect} from "react-redux";
import LogoImage from "./common/logo";

class HeaderThree extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading:false
        }
    }

    /*=====================
         Pre loader
         ==========================*/
    componentDidMount() {
        setTimeout(function() {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 1000);
    }

    componentWillMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        if (number >= 300) {
            if (window.innerWidth < 576) {
                document.getElementById("sticky").classList.remove('fixed');
            }else
                document.getElementById("sticky").classList.add('fixed');
        } else {
            document.getElementById("sticky").classList.remove('fixed');
        }
    }

    changeLanguage(lang) {
        store.dispatch(IntlActions.setLocale(lang))
    }

    
    

    

  
    render() {

        return (
            <div>
                <header id="sticky" className="sticky header-2 header-6">
                    {/* {this.state.isLoading ? <Pace color="#27ae60"/> : null}
                    <div className="mobile-fix-option"></div>
                    Top Header Component */}
                    <TopBarDark/>
                </header>
            </div>
        )
    }
}

export default connect(null,
    { changeCurrency }
)(HeaderThree);