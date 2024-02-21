/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useGetCartQuery,
  useDecreaseProductQuantityMutation,
  useIncreaseProductQuantityMutation,
  useRemoveProductFromCartMutation,
  useCancelOrderMutation,
  useCheckoutOrderMutation,
} from "../../../api/orderApi";
import { Loading, Error, ProductItem } from "../../../components";
import { getOrderTotal } from "../../../utils/helper_functions";

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
              <Button
                id={item.id}
                onClick={(e) => removeProductFromCart(e.target.id)}
              >
                Remove
              </Button>
              <Button
                id={item.id}
                onClick={(e) => increaseProductQuantity(e.target.id)}
              >
                Increase
              </Button>
              <Button
                id={item.id}
                onClick={(e) => decreaseProductQuantity(e.target.id)}
              >
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
  const { data, isLoading, refetch } = useGetCartQuery();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // get product order information
  const productsInOrder = data?.order?.orderDetailsWithDescriptions;
  const order = data?.order.order;

  // console.log("productsInOrder", productsInOrder);
  // console.log("order", order);

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100dvh",
        minWidth: "100dvw",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : !productsInOrder ? (
        <CartFailure />
      ) : (
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "space-evenly",
            textAlign: "center",
            minHeight: "100dvh",
            minWidth: "100dvw",
          }}
        >
          {/* Cart Header */}
          <Typography
            variant={isSmallScreen ? "h4" : "h3"}
            mt={2}
            mb={2}
            color="primary.main"
          >
            Cart Order ID: {order.id}
          </Typography>

          {/* Cart Items */}
          <Grid container gap={2} justifyContent="center">
            {productsInOrder.map((order) => {
              return (
                <Stack key={order.productId}>
                  <ProductItem
                    key={order.id}
                    product={order.itemDescription}
                    quantity={order.quantity}
                    sx={{
                      p: { xs: 0.5, sm: 1 },
                      bgcolor: "primary.main",
                      width: {
                        xs: 300,
                        sm: 320,
                      },
                    }}
                  />

                  {/* Card Action Buttons */}
                  <ButtonGroup sx={{ mt: 0.5 }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        console.log("the product id is", order.productId);
                        removeProductFromCart(order.productId);
                        refetch();
                      }}
                      sx={{ flexGrow: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        console.log("the product id is", order.productId);
                        increaseProductQuantity(order.productId);
                        refetch();
                      }}
                      sx={{ flexGrow: 1 }}
                    >
                      Increase
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        console.log("the product id is", order.productId);
                        decreaseProductQuantity(order.productId);
                        refetch();
                      }}
                      sx={{ flexGrow: 1 }}
                    >
                      Decrease
                    </Button>
                  </ButtonGroup>
                </Stack>
              );
            })}
          </Grid>

          {/* Cart Actions */}
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              mt: 2,
              mb: 2,
              gap: 2,
            }}
          >
            <Button variant="contained" onClick={cancelOrder}>
              Cancel Order
            </Button>
            <Button variant="contained" onClick={checkoutOrder}>
              Checkout
            </Button>
            <Typography variant="h4">
              Total: ${getOrderTotal(productsInOrder)}.00
            </Typography>
          </Stack>
        </Stack>
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
  }, []);

  const handleProductIncrease = async (productId) => {
    if (token) {
      const data = await increaseProductQuantity(Number(productId));
      console.log("Clicked Product Increase Button Data: ", data);
    } else {
      const cart = JSON.parse(window.sessionStorage.cart);
      cart[productId].quantity++;
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };

  const handleProductDecrease = async (productId) => {
    if (token) {
      const data = await decreaseProductQuantity(Number(productId));
      console.log("Clicked Product Decrease Button Data: ", data);
      return data;
    } else {
      const cart = JSON.parse(window.sessionStorage.cart);
      cart[productId].quantity--;
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };

  const handleProductRemoval = async (productId) => {
    if (token) {
      const data = await removeProductFromCart(Number(productId));
      console.log("Clicked Product Removal Button Data: ", data);
      return data;
    } else {
      const cart = JSON.parse(window.sessionStorage.cart);
      delete cart[productId];
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(Object.values(JSON.parse(window.sessionStorage.cart)));
    }
  };

  const handleCancelOrder = () => {
    if (token) {
      cancelOrder();
    } else {
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
