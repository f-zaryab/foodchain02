import { useEffect } from "react";
import useStore from "../../store/store";
import classes from "./CurrentOrder.module.css";
import { Card, SimpleGrid, Text } from "@mantine/core";

const CurrentOrders = () => {
  const { currentOrder, fetchCurrentOrder } = useStore();

  useEffect(() => {
    fetchCurrentOrder();
  }, [fetchCurrentOrder]);

  return (
    <section className={classes.mainContainer}>
      <h2 className={classes.heading}>My current Orders</h2>
      {currentOrder && (
        <div>
          <SimpleGrid cols={3}>
            {currentOrder.map((item) => (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                key={item.id}
              >
                <Text size="md" fw={500}>
                  customer_id: {item.customer_id}
                </Text>
                <Text size="md" fw={500}>
                  restaurant_id: {item.restaurant_id}
                </Text>
                <Text size="md" fw={500}>
                  total_amount: {item.total_amount}
                </Text>
                <Text size="md" fw={500}>
                  payment_status: {item.payment_status}
                </Text>
                <Text size="xl" fw={500}>
                  status: {item.status}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </div>
      )}
    </section>
  );
};

export default CurrentOrders;
