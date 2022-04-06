import React, {Component} from 'react';
import axios from 'axios';


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

var productItems="";

const itemsHandler=(x)=>{
    for(var v =0;v<x.length;v++){
        productItems = productItems + "," + x[v].name + "(" +x[v].qty + ")"
    }
    
}



class orderSuccess extends Component {

    constructor (props) {
        super (props)
        this.state = {}

    }

    render (){

        const {payment, items, symbol, orderTotal,orderID,town,phone,email,staffCode,extension,firstName,last_name} = this.props.location.state;

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var current = new Date();
        var next3days = new Date(Date.now() + 3 * 86400000);
        let CheckDate = current.toLocaleDateString("en-US", options).toString();
        let deliveryDate = next3days.toLocaleDateString("en-US", options).toString();

        const customer = {
            Orderid:orderID,
            first_name:firstName,
            last_name:last_name,
            phone:phone,
            email:email,
            staff_code:staffCode,
            extension:extension,
            town:town,
            month:n
        };

        const newSale = {
            Orderid:orderID,
            method_of_payment:payment,
            first_name:firstName,
            last_name:last_name,
            phone:phone,
            email:email,
            staff_code:staffCode,
            extension:extension,
            town:town,
            products:items,
            total:orderTotal,
            month:n
        } 
        const emailConfirm = {
            Orderid:orderID,
            method_of_payment:payment,
            first_name:firstName,
            last_name:last_name,
            phone:phone,
            email:email,
            staff_code:staffCode,
            extension:extension,
            town:town,
            products:items,
            total:orderTotal,
            date:CheckDate
        } 
       
       itemsHandler(items);

       const WipeClick = ()=>{

        axios.post('http://10.70.12.38:4000/products/access', emailConfirm).then(
            (res)=>{
                console.log(res);
            }
        )


           
    
            axios.post('http://10.70.12.38:4000/customers/create', customer).then(
                (res)=>{
                    console.log(res);
                }
            )
    
            axios.post('http://10.70.12.38:4000/sales/create',newSale).
            then(productItems = "");
            this.props.history.replace('/', null);

            
        }

        return (
            (payment)?
            <div>
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="success-text">
                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    <h2>thank you</h2>
                                    <p>Your order is now ready for processing. Confirm your order below</p>
                                    <p>Transaction ID: {orderID}</p>
                                    <button  type="button" className="btn-solid btn" onClick={() => WipeClick()}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-order">
                                    <h3>your order details</h3>
                                    {items.map((item, index) => {
                                    return <div className="row product-order-detail" key={index}>   
                                                <div className="col-3">
                                                    <img src={item.variants?
                                                        item.variants[0].images
                                                        :item.pictures[0]} alt="" className="img-fluid" />
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>product name</h4>
                                                        <h5>{item.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>quantity</h4>
                                                        <h5>{item.qty}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>price</h4>
                                                        <h5>{symbol}{item.sum}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                    <div className="total-sec">
                                        <ul>
                                            <li>subtotal <span>{symbol}{orderTotal}</span></li>
                                            {/* <li>shipping <span>$0</span></li> */}
                                            <li>tax(GST) <span>$0</span></li>
                                        </ul>
                                    </div>
                                    <div className="final-total">
                                        <h3>total <span>{symbol}{orderTotal}</span></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row order-success-sec">
                                    <div className="col-sm-6">
                                    <u><h4>Summary</h4></u>
                                        <ul className="order-detail">
                                            {(payment.paymentID)?
                                                <div>
                                            <li>payer ID: {payment.payerID}</li>
                                            <li>payment ID: {payment.paymentID}</li>
                                            <li>payment Token: {payment.paymentToken}</li></div>
                                                :
                                            <li>Order ID: {orderID}</li> }

                                            <li>Order Date: {CheckDate}</li>
                                            <li>Order Total: {symbol}{orderTotal}</li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <u><h4>Contact Address</h4></u>
                                        <ul className="order-detail">
                                            <li>{firstName} {last_name}</li>
                                            <li>{town}</li>
                                            <li>Staff Code:{staffCode}, Extension{extension}</li>
                                            <li>Contact No. {phone}</li>
                                            <li>Email : {email}</li>

                                        </ul>
                                    </div>

                                    <div className="col-sm-12 payment-mode">
                                        <h4>payment method</h4>
                                        <p>{payment}.</p>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="delivery-sec">
                                            <h3>expected date of delivery</h3>
                                            <h2>{deliveryDate}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            :
            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="error-section">
                                <h1>404</h1>
                                <h2>page not found</h2>
                                <a href="index.html" className="btn btn-solid">back to home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default orderSuccess