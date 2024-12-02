import { Card, Text, Badge, Group } from "@mantine/core";
import classes from "./CardInventory.module.css";

interface CardInventoryProps {
  transaction_id: string;
  inventory_id: string;
  kitchen_id: string;
  type: string;
  quantity: string;
  transaction_date: string;
  recorded_by: string;
  notes: string;
}

const CardInventory = ({
  transaction_id,
  inventory_id,
  kitchen_id,
  notes,
  quantity,
  type,
}: CardInventoryProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="md" mb="xs">
        <div className={classes.textContainer}>
          <Text size="xs" fw={500}>
            transaction ID: {transaction_id}
          </Text>
          <Text size="xs" fw={500}>
            Inventory ID: {inventory_id}
          </Text>
          <Text size="xs" fw={500}>
            Kitchen ID: {kitchen_id}
          </Text>
          <Text size="sm" c="dimmed">
            {notes}
          </Text>
        </div>
        <div className={classes.priceContainer}>
          <Text size="md" fw={500}>
            &#163;{quantity}
          </Text>
          <Badge color="blue">{type}</Badge>
        </div>
      </Group>
    </Card>
  );
};

export default CardInventory;
