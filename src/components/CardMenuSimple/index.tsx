import { Card, Text, Badge, Group } from "@mantine/core";
import classes from "./CardMenuSimple.module.css";

interface CardMenuSimpleProps {
  name: string;
  description: string;
  price: number;
  isFeatured: boolean;
}

const CardMenuSimple = ({
  name,
  description,
  price,
  isFeatured,
}: CardMenuSimpleProps) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder className={classes.cardContainer}>
      <Group justify="space-between" mt="md" mb="xs">
        <div className={classes.textContainer}>
          <Text size="lg" fw={500}>{name}</Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </div>
        <div>
          <Text fw={500}>Price: {price}</Text>
          {isFeatured && <Badge color="pink">{isFeatured}</Badge>}
        </div>
      </Group>
    </Card>
  );
};

export default CardMenuSimple;
