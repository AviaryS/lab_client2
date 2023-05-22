import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {host, sendRequest} from "../api";

function Cart({setTitle, token}) {
    const [cart, setCart] = useState([])

    const navigate = useNavigate();

    const fetchCart = async () => {
        const url = `${host}/cart`;
        try {
            let CartData = await sendRequest(url, 'GET', {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${token}`
            });

            CartData = CartData.data.map((product, index) => {
                product.quantity = 1;
                return product;
            });
            const filteredCartData = CartData.filter((product, index, self) =>
                index === self.findIndex((p) => p.product_id === product.product_id)
            );
            setCart(filteredCartData);
        } catch (e) {
            console.log(e);
        }
    };

    const createOrderClick = () => {
        const url = `${host}/order`
        const fetchCreateOrder = async () => {
            try {
                await sendRequest(url, 'POST', {
                    'Content-type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                })
                navigate('/order')
            } catch (e) {
                console.log(e)
            }
        }
        fetchCreateOrder()
    }

    const removeFromCartClick = (productId) => {
        const url = `${host}/cart/${productId}`
        const fetchCreateOrder = async () => {
            try {
                await sendRequest(url, 'DELETE', {
                    'Content-type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                })
                fetchCart()
            } catch (e) {
                console.log(e)
            }
        }
        fetchCreateOrder()
    }

    useEffect(() => {
        fetchCart()
        setTitle('Корзина')
    }, [])

    const increment = (productId) => {
        let newCart = [...cart]
        newCart[productId].quantity += 1

        setCart(newCart)
    }

    const decrement = (productId) => {
        let newCart = [...cart]
        newCart[productId].quantity -= 1

        setCart(newCart)
    }

    function total_price () {
        let sum = 0;

        cart.map((product) => {
            sum += product.price
        })
        return sum
    }

    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {cart.map((product, index) => (
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">{product.name}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">{product.price}р.<small
                                    className="text-muted fw-light"> &times; {product.quantity}
                                    шт.</small></h1>
                                <p>{product.description}</p>
                                <button type="button" className="btn btn-lg btn-info mb-3" onClick={() => increment(index)}>+</button>
                                <button type="button" className="btn btn-lg btn-warning mb-3" onClick={() => decrement(index)}>&minus;</button>
                                <button type="button" className="btn btn-lg btn-outline-danger mb-3" onClick={() => removeFromCartClick(product.id)}>Удалить из корзины
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row justify-content-center gap-1">
                <h2 className="mb-5">Итоговая стоимость: {total_price()}р.</h2>
                <button className="col-6 btn btn-lg btn-outline-info mb-3" type="button" onClick={() => navigate('/')}>Назад</button>
                <button type="button" className="col-6 btn btn-lg btn-primary mb-3" onClick={createOrderClick}>Оформить заказ</button>
            </div>
        </main>
    );
}

export default Cart;