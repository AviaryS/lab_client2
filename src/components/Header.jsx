import React from 'react';
import {Link} from "react-router-dom";
import {host, sendRequest} from "../api";

function Header({token, setToken, title}) {
    const logoutClick = () => {
        const fetchLogout = async () => {
            const url = `${host}/logout`
            try {
                await sendRequest(url, 'GET', {
                    'Content-type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                })
                setToken(null)
            } catch (e) {
                console.log(e)
            }
        }
        fetchLogout()
    }

    return (
        <main>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4">«Just buy»</span>
                    </Link>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        {token ?
                            <>
                                <Link className="me-3 py-2 text-dark text-decoration-none" to="order">Мои заказы</Link>
                                <Link className="me-3 py-2 text-dark text-decoration-none" to="cart">Корзина</Link>
                                <button onClick={logoutClick}>Выйти</button>
                            </>
                            :
                            <>
                                <Link className="me-3 py-2 text-dark text-decoration-none" to="register">Регистрация</Link>
                                <Link className="me-3 py-2 text-dark text-decoration-none" to="login">Авторизация</Link>
                            </>
                        }
                    </nav>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4 fw-normal">{title}</h1>
                </div>
            </header>
        </main>
    );
}

export default Header;