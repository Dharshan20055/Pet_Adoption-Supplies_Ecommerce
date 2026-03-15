import React, { useEffect, useState } from "react";
import { getCart, removeCartItem, checkoutCart } from "../../services/cartService";
import { Card, CardContent, Typography, Button } from "@mui/material";

const buyerId = "11111111-1111-1111-1111-111111111111";

function CartPage() {

  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    getCart(buyerId).then((res) => {
      setCartItems(res.data);
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = (cartId) => {
    removeCartItem(cartId).then(() => {
      loadCart();
    });
  };

  const handleCheckout = () => {
    checkoutCart(buyerId).then(() => {
      alert("Checkout successful");
      loadCart();
    });
  };

  return (
    <div style={{ padding: 20 }}>

      <Typography variant="h4">My Cart</Typography>

      {cartItems.map((item) => (
        <Card key={item.cartId} style={{ marginTop: 20 }}>
          <CardContent>

            <Typography>Pet ID: {item.petId}</Typography>
            <Typography>Supply ID: {item.supplyId}</Typography>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemove(item.cartId)}
              style={{ marginTop: 10 }}
            >
              Remove
            </Button>

          </CardContent>
        </Card>
      ))}

      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          style={{ marginTop: 20 }}
        >
          Checkout
        </Button>
      )}

    </div>
  );
}

export default CartPage;