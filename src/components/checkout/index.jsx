import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import {Link, Redirect } from 'react-router-dom';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import Breadcrumb from "../common/breadcrumb";
import {removeFromWishlist} from '../../actions';
import {getCartTotal} from "../../services";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var mail = '';

if(cookies.get('email') !== undefined){
 mail= cookies.get('email'); 
}
   
var productItems="";

const itemsHandler=(x)=>{
    for(var v =0;v<x.length;v++){
        productItems = productItems + "," + x[v].name + "(" +x[v].qty + ")"
    }
    
}

var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];

class checkOut extends Component {

    constructor (props) {
        super (props)

        this.state = {
            id:1,
            payment:'stripe',
            paymentb:'stripe',
            method_of_payment:'',
            first_name:'',
            last_name:'',
            phone:'',
            email:mail,
            address:'',
            staff_code:'',
            extension:'',
            town:'',
            products:productItems,
            total:'',
            month:n

        }
        this.onValueChange = this.onValueChange.bind(this);
        this.validator = new SimpleReactValidator();
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

      }

      setStateFromCheckbox = (event) => {
          var obj = {};
          obj[event.target.name] = event.target.checked;
          this.setState(obj);

          if(!this.validator.fieldValid(event.target.name))
          {
              this.validator.showMessages();
          }
        }

    checkhandle(value) {
        this.setState({
            payment: value
        })
    }

    onValueChange(event) {
        const RandomNumber = Math.floor(Math.random() * 1000) + 1;
        const {cartItems, total} = this.props;
        console.log(cartItems[0].name);
        itemsHandler(cartItems)
        this.setState({
            method_of_payment: event.target.value,
            products:productItems,
            total:total,
            id:RandomNumber
        });
      }

    StripeClick = () => {

        if (this.validator.allValid()) {
        const Random = Math.floor(Math.random() * 1000) + 1;
            const customer = {
                id:Random,
                first_name:this.state.first_name,
                last_name:this.state.last_name,
                phone:this.state.phone,
                email:this.state.email,
                staff_code:this.state.staff_code,
                extension:this.state.extension,
                town:this.state.town,
                month:this.state.month
            };

            // axios.post('http://10.70.12.38:4000/customers/add', customer).then(
            //     (res)=>{
            //         console.log(res);
            //     }
            // )

            // axios.post('http://10.70.12.38:4000/sales',this.state).
            // then((res)=>{console.log(n)});
            // productItems = "";

            this.props.history.push({
                pathname: '/order-success',
                    state: { 
                    payment: this.state.method_of_payment, 
                    items: this.props.cartItems, 
                    orderTotal: this.state.total,
                    symbol: this.props.symbol,
                    orderID: this.state.id,
                    town:this.state.town,
                    phone:this.state.phone,
                    email:this.state.email,
                    staffCode:this.state.staff_code,
                    extension:this.state.extension,
                    firstName:this.state.first_name,
                    last_name:this.state.last_name
                     }
            })

        } else {
          this.validator.showMessages();
          // rerender to show messages for the first time
          this.forceUpdate();
        }
    }

    render (){
        const {cartItems, symbol, total} = this.props;

        // Paypal Integration
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
            this.props.history.push({
                pathname: '/order-success',
                    state: { payment: payment, items: cartItems, orderTotal: total, symbol: symbol }
            })

        }

        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }

        const onError = (err) => {
            console.log("Error!", err);
        }

        const client = {
            sandbox:    'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
            production: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
        }


        return (
            <div>

                {/*SEO Support*/}
                <Helmet>
                    <title>OLD MUTUAL ONLINE BRAND SHOP</title>
                    <meta name="description" content="Om online brand shop" />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb  title={'Checkout'}/>

                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form">
                                <form>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>Billing Details</h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">First Name</div>
                                                    <input type="text" name="first_name" value={this.state.first_name}  onChange={this.setStateFromInput} />
                                                    {this.validator.message('first_name', this.state.first_name, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Last Name</div>
                                                    <input type="text" name="last_name" value={this.state.last_name}  onChange={this.setStateFromInput} />
                                                    {this.validator.message('last_name', this.state.last_name, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Phone</div>
                                                    <input type="text" name="phone"  value={this.state.phone} onChange={this.setStateFromInput} />
                                                    {this.validator.message('phone', this.state.phone, 'required|phone')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Email Address</div>
                                                    <input type="text" name="email" value={this.state.email}  />
                                                    {this.validator.message('email', this.state.email, 'required|email')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Staff Code</div>
                                                    <input type="text" name="staff_code" value={this.state.staff_code} onChange={this.setStateFromInput} />
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Extension</div>
                                                    <input type="text" name="extension" value={this.state.extension} onChange={this.setStateFromInput} />
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Town/City</div>
                                                    <input type="text" name="town" value={this.state.town} onChange={this.setStateFromInput} />
                                                    {this.validator.message('town', this.state.town, 'required|alpha')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-details">
                                                <div className="order-box">
                                                    <div className="title-box">
                                                        <div>Product <span> Total</span></div>
                                                    </div>
                                                    <ul className="qty">
                                                        {cartItems.map((item, index) => {
                                                            return <li key={index}>{item.name} × {item.qty} <span>{symbol} {item.sum}</span></li> })
                                                        }
                                                    </ul>
                                                    <ul className="sub-total">
                                                        <li>Subtotal <span className="count">{symbol}{total}</span></li>
                                                        <li>Payment Options 
                                                            <div className="shipping">
                                                            <div className="shopping-option">
                                                                <input type="radio" id="1 month" value="1 month" 
                                                                checked={this.state.method_of_payment === "1 month"} 
                                                                onChange={this.onValueChange}
                                                                />
                                                                    <label htmlFor="free-shipping">1 Month</label>
                                                            </div>
                                                            <div className="shopping-option">
                                                                <input type="radio"  id="2 months"  value="2 months"
                                                                
                                                                checked={this.state.method_of_payment === "2 months"} 
                                                                onChange={this.onValueChange}
                                                                />
                                                                    <label htmlFor="local-pickup">2 Months</label>
                                                            </div>
                                                            <div className="shopping-option">
                                                                <input type="radio"  id="3 months"  value="3 months"
                                                                checked={this.state.method_of_payment === "3 months"} 
                                                                onChange={this.onValueChange}
                                                                />
                                                                    <label htmlFor="local-pickup">3 Months</label>
                                                            </div>
                                                        </div>
                                                        </li>
                                                    </ul>

                                                    <ul className="total">
                                                        <li>Total <span className="count">{symbol}{total}</span></li>
                                                    </ul>
                                                </div>

                                                <div className="payment-box">
                                                    {(total !== 0)?
                                                    <div className="text-right">
                                                        {(this.state.paymentb === 'stripe')? <button type="button" className="btn-solid btn" onClick={() => this.StripeClick()} >Place Order</button>:
                                                         <PaypalExpressBtn env={'sandbox'} client={client} currency={'USD'} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />}
                                                    </div>
                                                    : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart)
})

export default connect(
    mapStateToProps,
    {removeFromWishlist}
)(checkOut)