import React, {Component} from 'react';

import {
    svgFreeShipping,
    svgservice,
    svgoffer,
    svgpayment
} from "../../../services/script"

class Service extends Component {
    render (){

        return (
            <div className="collection-filter-block ">
                <div className="product-service">
                    <div className="media">
                        <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                        <div className="media-body">
                            <h4>Free delivery</h4>
                            <p>Product is delivered straight to your office</p>
                        </div>
                    </div>
                    <div className="media">
                        <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                        <div className="media-body">
                            <h4>24 X 7 service</h4>
                            <p>shop anytime at any place</p>
                        </div>
                    </div>
                    <div className="media">
                        <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                        <div className="media-body">
                            <h4>Great Offers</h4>
                            <p>cheaper products during festive season</p>
                        </div>
                    </div>
                    <div className="media border-0 m-0">
                        <div dangerouslySetInnerHTML={{ __html: svgpayment }} />
                        <div className="media-body">
                            <h4>Online Shopping</h4>
                            <p>Contrary to popular belief.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Service;