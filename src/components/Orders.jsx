import React, {useEffect, useState} from 'react';
import {host, sendRequest} from "../api";
import {useNavigate} from "react-router-dom";

function Orders({setTitle, token}) {
    const [orders, serOrders] = useState([])

    const navigate = useNavigate();

    const fetchOrder = async () => {
        const url = `${host}/order`
        try {
            let OrderData = await sendRequest(url, 'GET', {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${token}`
            })
            serOrders(OrderData.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchOrder()
        setTitle('Заказы')
    }, [])

    function order_price () {
        let sum = 0
        orders.map((order) => {
            sum += order.order_price
        })
        return sum
    }

    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light">
                {orders.map((order, index) => (
                    <>
                        <h2 className="w-100">Заказ №{index + 1}</h2>
                        {order.products.map((product) => (
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">{product}</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">{product}р.<small
                                            className="text-muted fw-light"> &times; {product} шт.</small></h1>
                                        <p>{product}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ))}
            </div>
            <h2 className="w-100">Итоговая стоимость: {order_price()}р.</h2>
            <div className="row justify-content-center gap-1">
                <button className="col-6 btn btn-lg btn-outline-info mb-3" type="button" onClick={() => navigate('/')}>Назад</button>
            </div>
        </main>
    );
}

export default Orders;