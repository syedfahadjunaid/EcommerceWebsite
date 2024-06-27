import React, { useState } from "react";
import "./Cart.css";
import CartCard from "../../../Cards/CartCard/CartCard.js";
import SubTotalCard from "../../../Cards/SubTotalcard/SubTotalCard.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../Button/Button";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";
function Cart() {
  const history = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const loginState = useSelector((state) => state.user.userToken);
  // useEffect(() => {
  //   localStorage.setItem('ecommerce',JSON.stringify(cart))
  //   console.log(cart,'cart');
  // }, [cart]);
  const [loginTrue, setLoginTrue] = useState(false);

  return (
    <>
      <MainNavBar loginTrue={loginTrue} />
      <div className="cart">
        {cart?.data?.length === 0 ? (
          <div className="cart_empty">
            <p>Seems Like You Don't have anything in your cart</p>

            <Button color="#2874F0" link="/">
              Buy Something
            </Button>
          </div>
        ) : (
          <>
            <div className="cart_left">
              {cart?.data?.map((item) => (
                <CartCard
                  key={item.cart_id}
                  id={item.cart_id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  quantity={item.count}
                  mrp={item?.mrp}
                />
              ))}

              {loginState ? (
                <div className="cart_left_placeorder">
                  <button onClick={() => history("/checkout")}>
                    Place Order
                  </button>
                </div>
              ) : (
                <div className="cart_left_placeorder">
                  <button onClick={() => setLoginTrue(!loginTrue)}>
                    Login
                  </button>
                </div>
              )}
            </div>
            <div className="cart_right">
              <SubTotalCard />
            </div>
            {loginState ? (
              <div className="cart_left_placeorder_phone">
                <button onClick={() => history("/checkout")}>
                  Place Order
                </button>
              </div>
            ) : (
              <div className="cart_left_placeorder_phone">
                <button onClick={() => setLoginTrue(!loginTrue)}>Login</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
