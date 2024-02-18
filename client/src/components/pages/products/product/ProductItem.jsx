/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalize } from "../../../../utils/helper_functions";
import { useAddMutation } from "../../../../api/orderApi";
import { useSelector } from "react-redux";

const ProductItem = ({ product, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProductPage = location.pathname.includes("/product/");
  const [addItem] = useAddMutation();
  const { token } = useSelector((state) => state.user);
  const add = (e) => {
    e.preventDefault();
    //if user is logged in add item to cart, validation to check if item in cart not made
    if (token) addItem(Number(e.target.id));
    //if guest is adding to cart, add to session storage, this data will be sent once use logs in or registers
    else {
      if (window.sessionStorage.cart) {
        const data = JSON.parse(window.sessionStorage.cart);
        if (data[e.target.id]) data[e.target.id].quantity++;
        else
          data[e.target.id] = {
            quantity: 1,
            name: e.target.name,
            price: Number(e.target.dataset.price),
            id: Number(e.target.id),
            image: e.target.dataset.image,
          };
        window.sessionStorage.setItem("cart", JSON.stringify(data));
      } else {
        window.sessionStorage.setItem(
          "cart",
          JSON.stringify({
            [e.target.id]: {
              quantity: 1,
              name: e.target.name,
              price: Number(e.target.dataset.price),
              id: Number(e.target.id),
              image: e.target.dataset.image,
            },
          })
        );
      }
    }
  };
  let productDescription =
    !isProductPage && product.description.length > 60
      ? product.description.slice(0, 60) + "..."
      : product.description;
  productDescription = capitalize(productDescription);

  let productName = capitalize(product.name);

  // navigate to the product page if the user is not already on the product page
  const handleClick = () => {
    isProductPage ? "" : navigate(`/product/${product.id}`);
  };

  return (
    <Grid item>
      {/* trick to make our components behave like MUI components and inherit their props */}
      <Box {...props} key={product.id}>
        {/* card with a image, some content and some actions like add to cart */}
        <Tooltip title={productName} placement="top">
          <Card
            elevation={10}
            sx={{
              height: isProductPage ? 600 : 500,
            }}
          >
            {/* card image */}
            <CardMedia
              image={product.image}
              alt={productName}
              sx={{
                height: 320,
                objectFit: "fill", // makes the image fit perfectly into the card
              }}
              component="img"
            />

            {/* text inside of the card */}
            <Stack
              sx={{
                p: 2,
                //  height of the text container after subtracting the padding
                height: isProductPage ? 248 : 148,
                justifyContent: "space-between",
              }}
            >
              {/* Styling for the button name */}
              <Box
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="text" sx={{ color: "primary" }}>
                  <Typography variant="h5" fontWeight="bold">
                    {productName}
                  </Typography>
                </Button>
              </Box>

              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {productDescription}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Typography variant="body1" fontWeight={550}>
                  Price:{" "}
                  <Typography
                    component="span"
                    fontWeight={550}
                    sx={{ color: "primary.main" }}
                  >
                    ${product.price}
                  </Typography>
                </Typography>
                <Typography variant="body1" fontWeight={550}>
                  Quantity:{" "}
                  <Typography
                    component="span"
                    fontWeight={550}
                    sx={{ color: "primary.dark" }}
                  >
                    {product.count}
                  </Typography>
                </Typography>
                <button
                  id={product.id}
                  name={product.name}
                  data-price={product.price}
                  data-image={product.image}
                  onClick={(e) => add(e)}
                >
                  ADD TO CART
                </button>
              </Box>
            </Stack>
          </Card>
        </Tooltip>
      </Box>
    </Grid>
  );
};

export default ProductItem;
