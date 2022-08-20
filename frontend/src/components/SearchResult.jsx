// import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../utils/signupUtil";

const SearchResult = ({ searchResult }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(e.target.id);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyItems: "center",
          p: 4,
          flexGrow: 1,
        }}
      >
        {searchResult &&
          searchResult.map((recipe) => (
            <Card
              sx={{
                width: "25%",
                p: 4,
                m: 2,
                textAlign: "center",
              }}
              key={recipe.id}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={recipe.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.title}
                </Typography>
                <Button
                  variant="contained"
                  id={recipe.title}
                  sx={{
                    mt: 2,
                  }}
                  endIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default SearchResult;
