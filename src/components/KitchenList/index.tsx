import { useEffect } from "react";
// lib
import KitchenCards from "../KitchenCards";
import useStore from "../../store/store";
// styles
import classes from "./KitchenList.module.css";
import { SimpleGrid } from "@mantine/core";

const KitchenList = () => {
  const { fetchKitchenList, kitchenList, employeeDetail } = useStore();

  useEffect(() => {
    fetchKitchenList();
  }, [fetchKitchenList]);

  return (
    <section className={classes.mainContainer}>
      <h2 className={classes.heading}>List of All Kitchens</h2>
      <SimpleGrid
        cols={3}
        className={classes.gridContainer}
        spacing="lg"
        verticalSpacing="lg"
      >
        {kitchenList.length > 0 &&
          kitchenList.map((item) => (
            <div id={item.kitchen_id} key={item.kitchen_id}>
              <KitchenCards
                name={item.name}
                managerID={item.manager_id}
                kitchenID={item.kitchen_id}
                address={item.address}
                postcode={item.postcode}
                city={item.city}
                status={item.status}
                myKitchen={item.kitchen_id === employeeDetail.restaurant_id}
              />
            </div>
          ))}
      </SimpleGrid>
    </section>
  );
};

export default KitchenList;
