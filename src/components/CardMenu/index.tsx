import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import classes from "./CardMenu.module.css";

interface CardMenuProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  calories?: number;
  allergens?: string;
  status?: string;
  is_featured?: number;
  preparation_time?: string;
}

const CardMenu = ({ name, description, image, price }: CardMenuProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color="pink">Rs. {price}</Badge>
      </Group>

      <Text size="sm" c="dimmed" className={classes.descriptionBox}>
        {description}
      </Text>

      <Button
        variant="filled"
        color="red.0"
        radius="sm"
        className={classes.cartBtn}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default CardMenu;
