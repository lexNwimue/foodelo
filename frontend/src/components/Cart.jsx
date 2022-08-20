import Box from "@mui/system/Box";
import SignedInNavbar from "./SignedInNavbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { viewCart, deleteFromCart } from "../utils/signupUtil";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  // const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const getCartItems = async () => {
      let response = await viewCart();
      if (response.failed || response.unauthorized) {
        // setAuthorized(false);
        navigate("/login");
        return;
      }
      setCart(response);
      // setAuthorized(true);
    };
    getCartItems();
  }, [navigate]);

  const handleDelete = async (e) => {
    const cart = e.currentTarget.id;
    // const newFav = Cart.filter((fav) => fav !== word);
    // setCart(newFav);
    let response = await deleteFromCart(cart);
    console.log(response);
    setCart(response);
  };
  return (
    <>
      <SignedInNavbar />
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "#fdfdfd" }}>
        <Divider />
        <List>
          {cart &&
            cart.map((item) => {
              return (
                <Box key={item}>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        id={item}
                        onClick={handleDelete}
                      >
                        <ShoppingCartCheckoutIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
        </List>
      </Box>
    </>
  );
};

export default Cart;
