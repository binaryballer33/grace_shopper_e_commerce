import { Stack, Typography } from "@mui/material";
import {
  useDecreaseMutation,
  useInCartQuery,
  useIncreaseMutation,
  useRemoveMutation,
  useCancelMutation,
  useCheckoutMutation,
} from "../../../api/orderApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Cart = () => {
  //get profile data which contains the user cart to store into slice
  const { token } = useSelector((state) => state.user);
  const { data, isLoading } = useInCartQuery();
  const { order, items } = useSelector((state) => state.order);
  const [updateUp] = useIncreaseMutation();
  const [updateDown] = useDecreaseMutation();
  const [removeItem] = useRemoveMutation();
  const [cancel] = useCancelMutation();
  const [checkout] = useCheckoutMutation();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    };
    if (window.sessionStorage.cart) updateCart();
  }, []);

  const deleteFromCart = (e) => {
    if (token) removeItem(Number(e.target.id));
    else {
      const cart = JSON.parse(window.sessionStorage.cart);
      delete cart[e.target.id];
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };
  const increase = (e) => {
    if (token) updateUp(Number(e.target.id));
    else {
      const cart = JSON.parse(window.sessionStorage.cart);
      cart[e.target.id].quantity++;
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };
  const decrease = (e) => {
    if (token) updateDown(Number(e.target.id));
    else {
      const cart = JSON.parse(window.sessionStorage.cart);
      cart[e.target.id].quantity--;
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };
  const cancelOrder = () => {
    if (token) cancel();
    else {
      window.sessionStorage.removeItem("cart");
      setCart([]);
    }
  };
  const checkoutOrder = () => {
    if (token) checkout();
  };
  return token ? (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">Cart</Typography>

      {/* if cart is empty or no inCart order */}
      {isLoading ? (
        <>Loading...</>
      ) : !items.length ? (
        <>No items in cart</>
      ) : (
        <div>
          {/* remove placeholders when you styling  */}
          <h1>Placeholder</h1>
          <h1>Placeholder</h1>
          <h1>Placeholder</h1>
          <h1>Placeholder</h1>
          <h3>Order ID: {order.id}</h3>
          <div>Total: ${order.total}.00</div>
          <button onClick={cancelOrder}>Cancel Order</button>
          {items.map((item) => {
            return (
              <div key={item.productId}>
                <div>{item.itemDescription.name}</div>
                <img
                  src={item.itemDescription.image}
                  alt={item.itemDescription.name}
                />
                <div>Price: ${item.itemDescription.price}</div>
                <div>Quantity: {item.quantity}</div>
                <button id={item.productId} onClick={(e) => deleteFromCart(e)}>
                  Delete From Cart
                </button>
                <button id={item.productId} onClick={(e) => increase(e)}>
                  Increase
                </button>
                <button id={item.productId} onClick={(e) => decrease(e)}>
                  Decrease
                </button>
              </div>
            );
          })}
          <button onClick={checkoutOrder}>Checkout</button>
        </div>
      )}
    </Stack>
  ) : (
    <>
      {window.sessionStorage.cart && (
        <>
          <button onClick={cancelOrder}>Cancel Order</button>
        </>
      )}
      {window.sessionStorage.cart &&
        cart.map((item) => {
          return (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <img src={item.image} alt={item.name} />
              <div>Price: ${item.price}</div>
              <div>Quantity: x{item.quantity}</div>
              <button id={item.id} onClick={(e) => deleteFromCart(e)}>
                Remove
              </button>
              <button id={item.id} onClick={(e) => increase(e)}>
                Increase
              </button>
              <button id={item.id} onClick={(e) => decrease(e)}>
                Decrease
              </button>
            </div>
          );
        })}
      Login to checkout
    </>
  );
};

export default Cart;
