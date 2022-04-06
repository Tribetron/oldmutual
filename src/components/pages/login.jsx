import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import Breadcrumb from "../common/breadcrumb";
import HeaderThree from '../common/headers/header-three';
import UserProfile from '../../usercookie';
import Cookies from 'universal-cookie';
import Slider from 'react-slick';
import axios from 'axios';
import './login.css';

import  { Redirect } from 'react-router-dom';

const cookies = new Cookies();


class Login extends Component {

    constructor (props) {
        super (props);
        this.state= {
            username:'',
            password:'',
            loginMessage:'',
            color:'',
            display:'none'
        }

    }

    componentDidMount(){
        cookies.set('page','login')
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
        this.setState({
            loginMessage:''
        })
      } 
      setStateFromInputP = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }


      loginClick = ()=>{
        //   UserProfile.setName("some guys")
         
        this.setState({
            display:"inline-block"
        })
        
          var credentials = {
              username:this.state.username,
              password:this.state.password
          }
        //   console.log(credentials);
        // 10.70.12.38
          const API_PATH = 'http://10.70.12.38:81/ldap/ldapF.php';
          axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            data: credentials
          }).then(response => {
        if(response.status >= 200 && response.status < 300 && response.data == "Authentication Successful"){
                // const user_mail = response.data[0]["mail"][0];
                const email = this.state.username + "@oldmutual.co.zw";
                // const firstName = "JMACY";
                // const lastName = "SampleData";
                // console.log(response);

                // cookies.set('firstname',firstName,{path:'/'});
                // cookies.set('lastname',lastName,{path:'/'});
                cookies.set('username', this.state.username, { path: '/' });
                cookies.set('loggedIn',true,{path:'/'});
                cookies.set('email',email,{path:'/'});
                console.log("Aunthentication Successful");
                    this.setState({
                        display:"none",
                        color:"green", 
                        loginMessage:"Authentication Successful"
                    })
              window.location.reload(false);
              } else  {
        // console.log(response);
                this.setState({
                              display:"none",
                              color:"red",
                              loginMessage:"Aunthentication Error !"
                          })


          }

              
             
            
            })

      }

    render (){
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500
          };


        return (

            <>
                <Helmet>
                    <title>Old Mutual Online Brand Shop</title>
                </Helmet>
                <HeaderThree/>
                <div className="log-in-parent" 
                style={{   //backgroundImage:"url(http://10.70.12.38:3001/assets/images/kids/4.jpg)",
                                // backgroundRepeat:"no-repeat",
                                // backgroundSize:"contain",
                                // backgroundPosition:"right top",
                                // backgroundColor:"#f7f7f7"
                                
                    }}>
                    
                    
                    {/*Login section*/}
                    <section className="sub-log" >
                                        
                        
                                    <div className="sub-log-child" >
                                    <div className="page-label">
                                            <h3>Login</h3> 
                                        </div>
                                        {/* <form className="theme-form" action="http://10.70.12.38:80/ldap/ldap.php"> */}
                                            <div className="username-box box" >
                                                <label htmlFor="username">Username</label><br></br>
                                                <input type="text"  id="username" placeholder="Username"
                                                    name="username"  required="" value={this.state.username} onChange={this.setStateFromInput}  />
                                            </div>
                                            <div className="password-box box">
                                                <label htmlFor="password">Password</label><br></br>
                                                <input type="password"  id="password" name="password"
                                                    placeholder="Enter your password" required="" onChange={this.setStateFromInput} 
                                                    />
                                            </div>
                                            <div >
                                            <br></br>
                                                <img src="/assets/images/loading.gif" style={{height:'25px',display:this.state.display}}/>
                                                <p style={{color:this.state.color}}>{this.state.loginMessage}</p>
                                                <br></br>
                                            </div>
                                        <button className="btn btn-solid" onClick={this.loginClick}>Login</button>
                                        {/* </form> */}

                        
                        
                                    </div>
                    </section>

                </div>
            </>    
        )
    }
}

export default Login