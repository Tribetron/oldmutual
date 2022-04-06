import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual';
import ReactDOM from "react-dom";


// Custom Components
import HeaderOne from './common/headers/header-one';
import HeaderTwo from './common/headers/header-two';
import HeaderThree from './common/headers/header-three';

import FooterOne from "./common/footers/footer-one";
import FooterTwo from "./common/footers/footer-two";
import FooterThree from "./common/footers/footer-three";
import { withRouter } from "react-router-dom";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var loggednValue = cookies.get("loggedIn",{path:'/'});

class App extends Component {
    constructor(){
        super();
    }

  redirect = ()=>{
        if(loggednValue !== "true"){
            this.props.history.push('/')
        }
    }

    render() 
    {
    this.redirect();
    console.log(loggednValue);     
        return (
            <div>
                <HeaderOne logoName={'logo.png'}/>
                {this.props.children}
                <FooterOne logoName={'logo.png'}/>

                <ThemeSettings /> 
            </div>
        );
    }
}



export default withRouter(withTranslate(App));
