import { useEffect } from "react";
import { Grid } from "@mantine/core";
import { useLocation } from "react-router-dom";
import CardMenu from "../../components/CardMenu";
import useStore from "../../store/store";
import classes from "./MenuItemList.module.css";

const MenuItemsList = () => {
  const { menuItems, fetchMenuItems, addItemToCart } = useStore();
  const { state } = useLocation();
  const { targetId } = state || {};
  const { notification, setNotification } = useStore();

  // Fetch menu items on component load
  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Scroll to target element if specified
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView();
    }
  }, [targetId]);

  // Show notification
  useEffect(() => {
    if (notification) {
      alert(notification); // Display the notification
      setNotification(null); // Clear the notification after showing it
    }
  }, [notification, setNotification]);

  return (
    <section id='menu' className={classes.gridSection}>
      <div className={classes.internalContainer}>
        <h1 className={classes.heading}>Our Menu</h1>

        {menuItems.length > 0 ? (
          <Grid>
            {menuItems.map((item) => (
              <Grid.Col span={4} key={item.id}>
                <CardMenu
                  name={item.name}
                  description={item.description}
                  id={item.id}
                  price={item.price}
                  image={item.image}
                  onAddToCart={() => addItemToCart(item)}
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <p>No items to display</p>
        )}
      </div>
    </section>
  );
};

export default MenuItemsList;
