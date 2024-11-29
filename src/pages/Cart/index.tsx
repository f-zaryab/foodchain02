import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Group,
  Text,
  Notification,
  Divider,
  Paper,
} from "@mantine/core";
import useStore from "../../store/store";
import "./Cart.module.css";

export const CartPage = () => {
  const { cartItems, updateCartItem, removeItemFromCart, checkout } =
    useStore();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await checkout();
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Failed to complete checkout.");
    }
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateCartItem(itemId, newQuantity);
      }
    }
  };

  return (
    <Container size='md' py='xl' className='cartContainer'>
      <Text
        style={{ textAlign: "center" }}
        size='xl'
        fw={700}
        mb='lg'
        className='cartHeader'
      >
        🛒 Your Cart
      </Text>

      {error && (
        <Notification
          color='red'
          onClose={() => setError(null)}
          mb='md'
          title='Error'
          radius='md'
        >
          {error}
        </Notification>
      )}

      <Paper shadow='md' radius='md' p='lg' withBorder>
        {cartItems.length > 0 ? (
          <>
            <Table
              verticalSpacing='md'
              horizontalSpacing='sm'
              highlightOnHover
              className='styledTable'
            >
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Text fw={500}>{item.name}</Text>
                    </td>
                    <td>
                      <Group style={{ gap: "8px", justifyContent: "center" }}>
                        <Button
                          size='xs'
                          variant='outline'
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </Button>
                        <Text>{item.quantity}</Text>
                        <Button
                          size='xs'
                          variant='outline'
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </Button>
                      </Group>
                    </td>
                    <td>
                      <Text>£{item.price.toFixed(2)}</Text>
                    </td>
                    <td>
                      <Text fw={700}>
                        £{(item.quantity * item.price).toFixed(2)}
                      </Text>
                    </td>
                    <td>
                      <Button
                        variant='light'
                        color='red'
                        size='xs'
                        onClick={() => removeItemFromCart(item.id)}
                        className='removeButton'
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Divider my='lg' />

            <Group
              style={{ justifyContent: "flex-end" }}
              mt='lg'
              className='cartTotalGroup'
            >
              <Text fw={700} size='lg' className='totalLabel'>
                Total:
              </Text>
              <Text fw={700} size='lg' color='green' className='totalValue'>
                £
                {cartItems
                  .reduce((sum, item) => sum + item.quantity * item.price, 0)
                  .toFixed(2)}
              </Text>
            </Group>

            <Button
              fullWidth
              mt='xl'
              size='md'
              color='indigo'
              radius='md'
              onClick={handleCheckout}
              className='checkoutButton'
            >
              Proceed to Checkout
            </Button>
          </>
        ) : (
          <Text size='lg' color='dimmed' style={{ textAlign: "center" }}>
            Your cart is empty.
          </Text>
        )}
      </Paper>

      <Group style={{ justifyContent: "flex-end" }} mt='lg'>
        <Button
          variant='outline'
          color='blue'
          onClick={() => navigate("/")}
          size='md'
          radius='md'
          className='goBackButton'
        >
          Go Back to Homepage
        </Button>
      </Group>
    </Container>
  );
};
