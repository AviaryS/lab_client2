import React, {useEffect, useState} from 'react';
import {host, sendRequest} from "../api";


function Product({setTitle, token}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const url = `${host}/products`
            try {
                const ProductData = await sendRequest(url, 'GET')
                setProducts(ProductData.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchProducts()
        setTitle('Каталог товаров')
    }, []);

    const addToCartClick = async (productId) => {
        const url = `${host}/cart/${productId}`;
        try {
            await sendRequest(url, 'POST', {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${token}`
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {products.map((product) => (
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">{product.name}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">{product.price}р.</h1>
                                <p>{product.description}</p>
                                {token ?
                                    <button type="button" className="w-100 btn btn-lg btn-outline-primary active"
                                            onClick={(e) => {addToCartClick(product.id)}}>
                                        Добавить в корзину
                                    </button>
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Product;