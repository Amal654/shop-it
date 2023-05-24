import React, { useState } from 'react';
import '../styles/Home.css';
import Icon from "../images/box.png"
import Logo from "../images/shopping-cart.png"

const Home = () => {
    const [productAQuantity, setProductAQuantity] = useState(0);
    const [productBQuantity, setProductBQuantity] = useState(0);
    const [productCQuantity, setProductCQuantity] = useState(0);
    const [isProductAGift, setIsProductAGift] = useState(false);
    const [isProductBGift, setIsProductBGift] = useState(false);
    const [isProductCGift, setIsProductCGift] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [discountRule, setDiscountRule] = useState(0);
    const [discountAmount, setDiscount] = useState(0);
    const [giftWrapFee, setGiftWrap] = useState(0);
    const [shippingFee, setShipping] = useState(0);
    const [discountedTotal, setDiscountTotal] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const calculateDiscount = () => {
        setIsSubmitted(true)
        const productAPrice = 20;
        const productBPrice = 40;
        const productCPrice = 50;
        const totalQuantity = productAQuantity + productBQuantity + productCQuantity;
        const cartTotal = productAQuantity * productAPrice + productBQuantity * productBPrice + productCQuantity * productCPrice;

        let discountAmount = 0;
        let discountRule = 'none';

        let discounts = {
            flat_10_discount: 0,
            bulk_5_discount: 0,
            bulk_10_discount: 0,
            tiered_50_discount: 0
        }

        if (cartTotal > 200) {
            discounts['flat_10_discount'] = 10
        }

        if (productAQuantity > 10) {
            const bulkDiscountAmount = Math.min(productAQuantity - 10, productAQuantity) * productAPrice * 0.05;
            if (bulkDiscountAmount > discounts.bulk_5_discount)
                discounts.bulk_5_discount = bulkDiscountAmount
        }

        if (productBQuantity > 10) {
            const bulkDiscountAmount = Math.min(productBQuantity - 10, productBQuantity) * productBPrice * 0.05;
            if (bulkDiscountAmount > discounts.bulk_5_discount)
                discounts.bulk_5_discount = bulkDiscountAmount
        }

        if (productCQuantity > 10) {
            const bulkDiscountAmount = Math.min(productCQuantity - 10, productCQuantity) * productCPrice * 0.05;
            if (bulkDiscountAmount > discounts.bulk_5_discount)
                discounts.bulk_5_discount = bulkDiscountAmount
        }

        if (totalQuantity > 20) {
            discounts.bulk_10_discount = cartTotal * 0.1;
        }

        if (totalQuantity > 30 && (productAQuantity > 15 || productBQuantity > 15 || productCQuantity > 15)) {

            discounts.tiered_50_discount =
                Math.max(productAQuantity - 15, 0) * productAPrice * 0.5 +
                Math.max(productBQuantity - 15, 0) * productBPrice * 0.5 +
                Math.max(productCQuantity - 15, 0) * productCPrice * 0.5;

        }

        console.log("discounts", discounts)
        for (const key in discounts) {
            if (discounts[key] > discountAmount) {
                discountAmount = discounts[key]
                discountRule = key
            }
        }

        const giftWrapFee = (isProductAGift ? productAQuantity : 0) + (isProductBGift ? productBQuantity : 0) + (isProductCGift ? productCQuantity : 0);
        const shippingPackages = Math.ceil(totalQuantity / 10);
        const shippingFee = shippingPackages * 5;

        const discountedTotal = cartTotal - discountAmount + giftWrapFee + shippingFee;
        setCartTotal(cartTotal.toFixed(2));
        setDiscountRule(discountRule);
        setDiscount(discountAmount.toFixed(2));
        setGiftWrap(giftWrapFee.toFixed(2));
        setShipping(shippingFee.toFixed(2));
        setDiscountTotal(discountedTotal.toFixed(2))
    };

    const resetValues = () => {
        setProductAQuantity(0);
        setProductBQuantity(0);
        setProductCQuantity(0);
        setIsProductAGift(false);
        setIsProductBGift(false);
        setIsProductCGift(false);
        setIsSubmitted(false)
    };

    return (

        <div>
            <div className='navbar'>
                <div className='heading'>
                    <img src={Logo} className='logo' alt='Container box' />
                    <h2>SHOP IT</h2>
                </div>
            </div>

            <div className='main-container'>
                <div className='box-container1'>
                    <div className='box'>
                        <img src={Icon} className='image' alt='Container box' />
                        <div className='text-decoration'>Product A </div><br />
                        <div className='text-decoration'>$20</div>
                    </div>

                    <div className='box'>
                        <img src={Icon} className='image' alt='Container box' />
                        <div className='text-decoration'>Product B</div><br />
                        <div className='text-decoration'>$40</div>
                    </div>


                    <div className='box'>
                        <img src={Icon} className='image' alt='Container box' />
                        <div className='text-decoration'>Product C</div><br />
                        <div className='text-decoration'>$50</div>
                    </div>
                </div>


                <div className='box-container2'>
                    <div className='box-container21'>
                      
                        <div className='input-box'>
                            <div className='input'>
                                <label className='dis-flex'>
                                    Product A Quantity:
                                    <input type="number" className='qty-input' min='0' max='999' value={productAQuantity} onChange={(e) => setProductAQuantity(parseInt(e.target.value))} />
                                </label>
                            </div>
                            <div>
                                <label >
                                    Gift Wrap:
                                    <input type="checkbox" checked={isProductAGift} onChange={() => setIsProductAGift(!isProductAGift)} />
                                </label>
                            </div>
                        </div>

                        <div className='input-box'>
                            <div className='input'>
                                <label className='dis-flex'>
                                    Product B Quantity:
                                    <input type="number" className='qty-input' min='0' max='999' value={productBQuantity} onChange={(e) => setProductBQuantity(parseInt(e.target.value))} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Gift Wrap:
                                    <input type="checkbox" checked={isProductBGift} onChange={() => setIsProductBGift(!isProductBGift)} />
                                </label>
                            </div>
                        </div>

                        <div className='input-box'>
                            <div className='input'>
                                <label className='dis-flex'>
                                    Product C Quantity:
                                    <input type="number" className='qty-input' min='0' max='999' value={productCQuantity} onChange={(e) => setProductCQuantity(parseInt(e.target.value))} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Gift Wrap:
                                    <input type="checkbox" checked={isProductCGift} onChange={() => setIsProductCGift(!isProductCGift)} />
                                </label>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='left-container'>
                                <div className='calculation'>
                                    Product A Quantity:<br />
                                    Cost:<br />
                                    Product B Quantity:<br />
                                    Cost:<br />
                                    Product C Quantity:<br />
                                    Cost:<br /><br/>
                                    Subtotal:<br />
                                    Coupon code:<br />
                                    Discount:<br />
                                    Gift wrap:<br />
                                    Shipping:<br /><br />
                                    Total:
                                </div>
                            </div>

                            <div className='right-container'>
                                {isSubmitted ?
                                    <div >
                                        <div className='calculation align'>
                                            {productAQuantity}<br />
                                            ${productAQuantity * 20}<br />
                                            {productBQuantity}<br />
                                            ${productBQuantity * 40}<br />
                                            {productCQuantity}<br />
                                            ${productCQuantity * 50}<br /><br/>
                                            ${cartTotal}<br />
                                            <span className='red-text'>{discountRule}</span><br />
                                            <span className='green-text'>-${discountAmount}</span><br />
                                            ${giftWrapFee}<br />
                                            ${shippingFee}<br /><br />
                                            <span className='total'>${discountedTotal}</span>
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>

                        <div className='btn-container'>
                            <button onClick={resetValues} className='button'>Reset</button>
                            <button onClick={calculateDiscount} className='button'>Calculate</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default Home;
