import "./assets/css/bootstrap.min.css"
import "./assets/css/style.css"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import {useState} from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Product from "./components/Product";

function App() {
  const [token, setToken] = useState(null)
  const [title, setTitle] = useState('')

  return (
      <main>
        <div className="container py-3">
          <BrowserRouter>
            <Header
                title={title}
                token={token}
                setToken={setToken}
            />
            <Routes>
              <Route
                  path='/'
                  element={<Product
                      setTitle={setTitle}
                      token={token}
                  />}
              />
              <Route
                  path='/register'
                  element={<Register
                      setTitle={setTitle}
                  />}
              />
              <Route
                  path='/login'
                  element={<Login
                      setTitle={setTitle}
                      setToken={setToken}
                  />}
              />
              <Route
                  path='/cart'
                  element={<Cart
                      setTitle={setTitle}
                      token={token}
                  />}
              />
              <Route
                  path='/order'
                  element={<Orders
                      setTitle={setTitle}
                      token={token}
                  />}
              />
            </Routes>
          </BrowserRouter>
          <footer className="pt-4 my-md-5 pt-md-5 border-top">
            <div className="row">
              <div className="col-12 col-md">
                <small className="d-block mb-3 text-muted">&copy; 2017–2021</small>
              </div>
            </div>
          </footer>
        </div>
      </main>
  );
}

export default App;