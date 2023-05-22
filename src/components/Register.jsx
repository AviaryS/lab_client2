import React, {useEffect, useState} from 'react';
import {useNavigate } from 'react-router-dom'
import {host, sendRequest} from "../api";

function Register({setTitle}) {
    const [fio, setFio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)

    const navigate = useNavigate('/')

    useEffect(() => {
        setTitle('Регистрация')
    }, [])

    const registerClick = (e) => {
        e.preventDefault()
        setError(false)
        const fetchRegister = async () => {
            const url = `${host}/signup`
            try {
                await sendRequest(url, 'POST', {
                    'Content-type': 'Application/json',
                }, {
                    "fio": fio,
                    "email": email,
                    "password": password
                })
                navigate('/login')
            } catch (e) {
                console.log(e)
                setError(true)
            }
        }
        fetchRegister()
    }

    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                <div className="col">
                    <div className="row">
                        <form onSubmit={registerClick}>
                            <h1 className="h3 mb-3 fw-normal text-danger">Пожалуйста заполните все поля</h1>
                            <div className="form-floating mb-3">
                                <input type="text" className={`form-control ${error ? 'is-invalid' : 'is-valid'}`} id="floatingFio" placeholder="ФИО"
                                       value={fio} onChange={e => {setFio(e.target.value)}}
                                />
                                <label htmlFor="floatingFio">ФИО</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className={`form-control ${error ? 'is-invalid' : 'is-valid'}`} id="floatingInput"
                                       placeholder="name@example.com"
                                       value={email} onChange={e => {setEmail(e.target.value)}}
                                />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className={`form-control ${error ? 'is-invalid' : 'is-valid'}`} id="floatingPassword"
                                       placeholder="Password"
                                       value={password} onChange={e => {setPassword(e.target.value)}}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">Зарегистрироваться
                            </button>
                            <button className="w-100 btn btn-lg btn-outline-info" type="submit"
                                    onClick={() => navigate('/')}>Назад</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;