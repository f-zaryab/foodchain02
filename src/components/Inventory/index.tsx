import { useEffect } from "react";
import { Divider, ScrollArea, SimpleGrid } from "@mantine/core";
// src
import CardInventory from "../CardInventory";
import useStore from "../../store/store";
// styles
import classes from "./Inventory.module.css";

const Inventory = () => {
  const { employeeDetail, inventoryTransactions, fetchInventoryTransactions } =
    useStore();

  useEffect(() => {
    if (employeeDetail.position) {
      fetchInventoryTransactions();
    }
  }, [employeeDetail.position, fetchInventoryTransactions]);

  return (
    <section className={classes.mainContainer}>
      <h2 className={classes.heading}>Inventory Section</h2>

      {/* --------------------- Getting Inventory List --------------------- */}
      <Divider
        my="xs"
        label="All Inventory"
        labelPosition="center"
        className={classes.labelDivider}
      />

      <ScrollArea h={450} pb={30}>
        <SimpleGrid cols={3} spacing="lg" verticalSpacing="lg">
          {inventoryTransactions.map((item) => (
            <CardInventory
              inventory_id={item.inventory_id}
              kitchen_id={item.kitchen_id}
              notes={item.notes}
              quantity={item.quantity}
              recorded_by={item.recorded_by}
              transaction_date={item.transaction_date}
              transaction_id={item.transaction_id}
              type={item.type}
              key={item.inventory_id}
            />
          ))}
        </SimpleGrid>
      </ScrollArea>
    </section>
  );
};

export default Inventory;
