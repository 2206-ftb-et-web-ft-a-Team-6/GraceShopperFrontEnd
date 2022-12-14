import React, { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import {
  Products,
  Login,
  Register,
  Home,
  NavBar,
  SingleProduct,
  Cart,
  Checkout,
  MyAccount,
  Users,
  Profile,
} from "./index";
import {
  getCartByUserId,
  getGuestCartByCode,
  createGuestCart,
  createUserCart,
} from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";

const App = () => {
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState({});
  const [refresh, setRefresh] = useState(false);
  async function getCart() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);
      const gottenCart = await getCartByUserId(token, user.id);
      if (!gottenCart.id) {
        const createdCart = await createUserCart(token);
        setCart(createdCart);
      } else {
        setCart(gottenCart);
      }
    } else {
      const cartCode = localStorage.getItem("cartCode");

      if (!cartCode) {
        const code = await createGuestCart();
        const gottenCart = await getGuestCartByCode(code.code);
        localStorage.setItem("cartCode", code.code);
        setCart(gottenCart);
      } else {
        const gottenCart = await getGuestCartByCode(cartCode);
        setCart(gottenCart);
      }
    }
  }
  useEffect(() => {
    getCart();
  }, [refresh]);

  return (
    <div>
      <NavBar setCategory={setCategory} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              cart={cart}
              setCart={setCart}
              category={category}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        />
        <Route
          path="/products/:product_id"
          element={
            <SingleProduct
              cart={cart}
              refresh={refresh}
              setRefresh={setRefresh}
              setCart={setCart}
            />
          }
        />
        <Route path="/login" element={<Login setCart={setCart} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        />
        <Route path="/checkout/me" element={<MyAccount />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/me"
          element={localStorage.getItem("token") ? <Profile /> : null}
        />
      </Routes>
    </div>
  );
};

export default App;
