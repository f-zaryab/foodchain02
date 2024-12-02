import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import classes from "./CardMenu.module.css";

interface CardMenuProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  onAddToCart: () => void;
}

const CardMenu = ({
  name,
  description,
  image,
  price,
  onAddToCart,
}: CardMenuProps) => {
  const defaultImage =
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png";

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={defaultImage || image} height={160} alt={name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color="pink">GBP. {price}</Badge>
      </Group>

      <Text size="sm" c="dimmed" className={classes.descriptionBox}>
        {description}
      </Text>

      <Button
        variant="filled"
        color="red.0"
        radius="sm"
        className={classes.cartBtn}
        onClick={onAddToCart}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default CardMenu;
