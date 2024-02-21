/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  useGetCartQuery,
  useDecreaseProductQuantityMutation,
  useIncreaseProductQuantityMutation,
  useRemoveProductFromCartMutation,
  useCancelOrderMutation,
  useCheckoutOrderMutation,
} from "../../../api/orderApi";
import { Loading, Error, ProductItem } from "../../../components";
import { useEffect } from "react";

const CartFailure = () => {
  return (
    <Typography variant="h4" color="primary.main">
      No items in cart
    </Typography>
  );
};

const LoggedOutUserCart = ({
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromCart,
  cancelOrder,
  checkoutOrder, // this probably should be used for a logged out user too
  cart,
}) => {
  return (
    <Box>
      {window.sessionStorage.cart &&
        cart.map((item) => {
          return (
            <Box key={item.id}>
              <Typography variant="h3">{item.name}</Typography>
              <img src={item.image} alt={item.name} />
              <Typography variant="body2">Price: ${item.price}</Typography>
              <Typography variant="body2">
                Quantity: x{item.quantity}
              </Typography>
              <Button id={item.id} onClick={(e) => removeProductFromCart(e)}>
                Remove
              </Button>
              <Button id={item.id} onClick={(e) => increaseProductQuantity(e)}>
                Increase
              </Button>
              <Button id={item.id} onClick={(e) => decreaseProductQuantity(e)}>
                Decrease
              </Button>
              {/* <Box>
                <Button variant="contained" onClick={cancelOrder}>
                  Cancel Order
                </Button>
              </Box> */}
            </Box>
          );
        })}
      Login to checkout
    </Box>
  );
};

const LoggedInUserCart = ({
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromCart,
  cancelOrder,
  checkoutOrder,
  cart, // why is this not needed for a logged in user?
}) => {
  const { data, isLoading } = useGetCartQuery();
  const { order, items } = useSelector((state) => state.order);

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : !items.length ? (
        <CartFailure />
      ) : (
        <Box>
          <Typography variant="h4">Cart</Typography>
          <Typography variant="h3">Order ID: {order.id}</Typography>
          <Typography variant="body2">Total: ${order.total}.00</Typography>
          <Button variant="contained" onClick={cancelOrder}>
            Cancel Order
          </Button>
          {items.map((item) => {
            return (
              <Box key={item.productId}>
                <Grid container gap={2} justifyContent="center">
                  <ProductItem
                    key={item.id}
                    sx={{
                      p: { xs: 0.5, sm: 1 },
                      bgcolor: "primary.main",
                      width: {
                        xs: 300,
                        sm: 400,
                        md: 350,
                        lg: 330,
                      },
                    }}
                    product={item.itemDescription}
                  />
                </Grid>
                <Button
                  variant="contained"
                  id={item.productId}
                  onClick={(e) => removeProductFromCart(e)}
                >
                  Delete From Cart
                </Button>
                <Button
                  variant="contained"
                  id={item.productId}
                  onClick={(e) => increaseProductQuantity(e)}
                >
                  Increase
                </Button>
                <Button
                  variant="contained"
                  id={item.productId}
                  onClick={(e) => decreaseProductQuantity(e)}
                >
                  Decrease
                </Button>
              </Box>
            );
          })}
          <Button variant="contained" onClick={checkoutOrder}>
            Checkout
          </Button>
        </Box>
      )}
    </Stack>
  );
};

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { token } = useSelector((state) => state.user);
  const [increaseProductQuantity] = useIncreaseProductQuantityMutation();
  const [decreaseProductQuantity] = useDecreaseProductQuantityMutation();
  const [removeProductFromCart] = useRemoveProductFromCartMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [checkoutOrder] = useCheckoutOrderMutation();

  useEffect(() => {
    const updateCart = () => {
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    };
    if (window.sessionStorage.cart) updateCart();
  }, [!token]);

  const handleProductIncrease = (e) => {
    if (token) increaseProductQuantity(Number(e.target.id));
    else {
      const cart = JSON.parse(window.sessionStorage.cart);
      cart[e.target.id].quantity++;
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };

  const handleProductDecrease = (e) => {
    if (token) decreaseProductQuantity(Number(e.target.id));
    else {
      const cart = JSON.parse(window.sessionStorage.cart);
      if (cart[e.target.id].quantity < 2) return handleProductRemoval(e);
      cart[e.target.id].quantity--;
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };

  const handleProductRemoval = (e) => {
    if (token) removeProductFromCart(Number(e.target.id));
    else {
      const cart = JSON.parse(window.sessionStorage.cart);
      delete cart[e.target.id];
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };

  const handleCancelOrder = () => {
    if (token) cancelOrder();
    else {
      window.sessionStorage.removeItem("cart");
      setCart([]);
    }
  };

  const handleCheckoutOrder = () => {
    if (token) checkoutOrder();
  };

  // if user is logged in show LoggedInUserCart, else show LoggedOutUserCart
  return token ? (
    <LoggedInUserCart
      increaseProductQuantity={handleProductIncrease}
      decreaseProductQuantity={handleProductDecrease}
      removeProductFromCart={handleProductRemoval}
      cancelOrder={handleCancelOrder}
      checkoutOrder={handleCheckoutOrder}
      cart={cart}
    />
  ) : (
    <LoggedOutUserCart
      increaseProductQuantity={handleProductIncrease}
      decreaseProductQuantity={handleProductDecrease}
      removeProductFromCart={handleProductRemoval}
      //   cancelOrder={handleCancelOrder}
      checkoutOrder={handleCheckoutOrder}
      cart={cart}
    />
  );
};

export default Cart;
