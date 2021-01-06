// lesson 37.7 add product database cart

        // for count 
        const sameProduct=newCart.filter(pd=>pd.key===product.key);
        const count=sameProduct.length;
        addToDatabaseCart(product.key,count)

// lesson 37.8 select product show review routes

import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import {getDatabaseCart} from '../../utilities/databaseManager'

const [cart,setCart]=useState([]);

useEffect(()=>{
    const savedCart=getDatabaseCart()
    // product key get methods
    const productKey=Object.keys(savedCart);
    // product value get methods
    // const productValue=Object.values(savedCart)
    // product value get methods 
    const cartProduct=productKey.map(key=>{
        const product=fakeData.find(pd=>pd.key===key)
        product.quantity=savedCart[key];
        return product;
    })  
    setCart(cartProduct)
},[]) 


// lesson 37.9 create reviewItemDetails 
Review.js {
        <h1>Order Items : {cart.length}</h1>
        {
            cart.map(pd=><ReviewItem key={pd.key} product={pd}></ReviewItem>)
        }
}

// create remove Item and parameters pass
import React from 'react';
import { Link } from 'react-router-dom';
import Review from './src/components/Review/Review';

const ReviewItem = (props) => {
    const {name,price,quantity,seller,key}=props.product;
    return (
        <div>
            <Link to={`/details/${key}`} className='info-name'><h4>{name}</h4></Link>
            <h5>Price : {price}</h5>
            <h5>seller : {seller}</h5>
            <h6>Quantity : {quantity}</h6>
            <button className='main_button'>Remove</button>
        </div>
    );
};


====================>>>>>>>>>>>>>>>>>>>>>>>38.2 Review.js
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart]=useState([]);

//     this lesson
    const removeProduct=(productKey)=>{ 
        const newCart=cart.filter(pd=>pd.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }
// this lesson end
    useEffect(()=>{
        const savedCart=getDatabaseCart(); 
        const productKey=Object.keys(savedCart) 
        const cartProduct=productKey.map(key=>{
            const product=fakeData.find(pd=>pd.key===key)
            product.quantity=savedCart[key];
            return product;
        })
        setCart(cartProduct)
    },[])

    return (
        <div>
            <h4>Review Item : {cart.length}</h4> 
            {/* this lesson work is removeProduct parameters pass */}
            {
                cart.map(pd=><ReviewItem product={pd} removeProduct={removeProduct} key={pd.key}></ReviewItem>)
            }
        </div>
    );
};

export default Review;

 ReviewItem.js
// pass key parameters in removeProduct onclick function
<button onClick={()=>props.removeProduct(key)} className='main_button'>Remove</button>


38.3=============================>>
// review.js
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart]=useState([]);

    const removeProduct=(productKey)=>{ 
        const newCart=cart.filter(pd=>pd.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart=getDatabaseCart(); 
        const productKey=Object.keys(savedCart) 
        const cartProduct=productKey.map(key=>{
            const product=fakeData.find(pd=>pd.key===key)
            product.quantity=savedCart[key];
            return product;
        })
        setCart(cartProduct)
    },[])
// just add className and create div import cart and set props and pass props paramteres
    return (
        <div className='twin-container'>
            <div className='product-container'>
            <h4>Review Item : {cart.length}</h4> 
            {
                cart.map(pd=><ReviewItem product={pd} removeProduct={removeProduct} key={pd.key}></ReviewItem>)
            }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;

// cart.js

import { faTable } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart=props.cart;
    // const totalPrice=cart.reduce((total,prod)=>total+prod.price,0) 
    let total=0;
    for(let i=0; i<cart.length; i++){
        const product=cart[i];
        // add 38.3 *product.quantity
        total=total+product.price*product.quantity;
        debugger;
    };
    let shipping=0;
    if(total > 35){
        shipping=0;
    }else if(total > 15){
        shipping=4.99;
    }else if(total > 0){
        shipping =12.99;
    }
    const tax=(total/10).toFixed(2);
    const grandTotal=(total+shipping+Number(tax)).toFixed(2)
    const formatNumber=num=>{
        const precision=num.toFixed(2);
        return Number(precision)
    }

/==================================>>>>>>>38.4
// jodi amra debugger korte chai tahole amader debugger likhte hobe example
const total=numb*33;
debugger;


// work in shop components in handleAddProduct

const Shop = () => { 
    const first10=fakeData.slice(0,10) 
    const [data, setData] = useState(first10); 
    const [cart,setCart]=useState([])
    const handleAddProduct=(product)=>{ 
        const toBeAdded=product.key;
        const sameProduct=cart.find(pd=>pd.key===product.key)
        let count=1;
        let newCart;
        if(sameProduct){
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd => pd.key !== toBeAdded)

            newCart=[...others, sameProduct];
        }else{
            product.quantity=1;
            newCart=[...cart,product]
        }
        setCart(newCart); 

        addToDatabaseCart(product.key,count); 
    }


    38.5 ================================>>>>>>>>>>>>>>>>>>>>>>

    // add useEffect hooks in shop components
    useEffect(()=>{
        const savedCart=getDatabaseCart(); 
        const productKey=Object.keys(savedCart)
        const previousProduct=productKey.map(existingKey=>{
            const product=fakeData.find(pd=>pd.key===existingKey); 
            product.quantity=savedCart[existingKey]
            return product;
        }) 
        setCart(previousProduct)
    },[])

    38.6====================================>>>>>>>>>>>>>>>>>>>>>>>>

    // add to shop components
    <Cart 
    cart={cart}>
        <Link to='/review'><button className='main_button'>Review Order</button></Link>
    </Cart>; 
    // add to remove cart components and add 
    <div>
    <h2>Order Summary</h2>
    <h5>Items ordered:{cart.length}</h5>
    <p>shipping Cost {formatNumber(shipping)}</p>
    <p>Tax + Vat : {tax}</p>
    <p>total price : {grandTotal}</p>
    {
        props.children
    }
</div>

// add to review components
const [orderPlaced,setOrderPlaced]=useState(false)
const handlePlaceOrder=()=>{
    setCart([])
    setOrderPlaced(true)
    processOrder()
    console.log('order-placed');
}

let thankYouImg;
if(orderPlaced){
    thankYouImg=<img src={happyImage} alt=""/>
}
// in review components
{
    thankYouImg
}

// go route file select file and press f12