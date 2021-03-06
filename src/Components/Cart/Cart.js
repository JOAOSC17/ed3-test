import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import CartContext from '../../context/cart/CartContext'
import './Cart.css'
import CartItem from './CartItem/CartItem';
export default function Cart() {
    const {cartItems, showHideCart}=useContext(CartContext);
    const [product, setProduct] = useState([])
    function formatCurrency (currency){
      return  new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(currency)
    }
    console.log(cartItems);
    useEffect(()=>{
        axios
        .get(`https://my-json-server.typicode.com/JOAOSC17/ED3/products`)
        .then(response=>setProduct(response.data))
        .catch(err=>console.error(err))
        console.log(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
        <div className="cart">
                <div className="cart__close" onClick={showHideCart}>
                <img src={'https://ed3.netlify.app/assets/close.svg'} draggable="false" alt="close"/>
                </div>
                <div className="cart__cart">
                    <div className="cart__cart-header">
                <span><img src={'https://ed3.netlify.app/assets/shopping-bag.svg'} draggable="false" alt="shopping-bag"/></span>
                <div className="cart__cart-header-count">{Math.ceil(cartItems.reduce((amount,item) => item.qty + amount, 0))}</div>
                    </div>
                    {cartItems.length ===0?(<h6 className="cart__cart-title">Não há produtos no carrinho</h6>):(
                        <>
                        <ul className="cart__cart-items">
                            {cartItems.map(item=>(
                                <CartItem formatCurrency={formatCurrency} key={item._id} item={item}/>
                            ))}
                        </ul>
                     <div className="cart__cart-price">
                     <p className="cart__cart-price__title">SubTotal</p>
                     <div className="cart__cart-price__number">
                     {formatCurrency(cartItems.reduce((amount,item) => amount+= ( item.currentPrice * Math.ceil(item.qty)) , 0))}
                     </div>
                     </div>

                 <div className="cart__cart-cta">
                         <p className="cart__cart-cta__title">FALTAM APENAS <span>R$40,00</span> PARA VOCÊ GANHAR FRETE GRÁTIS</p>
                     <button className="cart__cart-cta__btn">FINALIZAR COMPRA</button>
                     </div>
                 </>
                 )  }

                 </div>

            </div>
        )          
        </>
    )
}