// lib
import { useEffect } from "react";
import { Grid } from "@mantine/core";
import { useLocation } from "react-router-dom";
// src
import CardMenu from "../../components/CardMenu";
import useStore from "../../store/store";
// css
import classes from "./MenuItemList.module.css";

const MenuItemsList = () => {
  const { menuItems, fetchMenuItems } = useStore();

  const { state } = useLocation();
  const { targetId } = state || {};

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView();
    }
  }, [targetId]);

  return (
    <section id="menu" className={classes.gridSection}>
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
                  image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
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
