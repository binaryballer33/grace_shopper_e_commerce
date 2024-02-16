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

const Cart = () => {
  //get profile data which contains the user cart to store into slice
  const { data, isLoading } = useInCartQuery();
  const { order, items } = useSelector((state) => state.order);
  console.log(order, items);
  const [updateUp] = useIncreaseMutation();
  const [updateDown] = useDecreaseMutation();
  const [removeItem] = useRemoveMutation();
  const [cancel] = useCancelMutation();
  const [checkout] = useCheckoutMutation();
  const deleteFromCart = (e) => {
    removeItem(Number(e.target.id));
  };
  const increase = (e) => {
    updateUp(Number(e.target.id));
  };
  const decrease = (e) => {
    updateDown(Number(e.target.id));
  };
  const cancelOrder = () => {
    cancel();
  };
  const checkoutOrder = () => {
    checkout();
  };
  return (
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
  );
};

export default Cart;
