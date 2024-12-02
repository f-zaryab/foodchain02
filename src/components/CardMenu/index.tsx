import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import classes from "./CardMenu.module.css";

interface CardMenuProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  onAddToCart: () => void; // New prop for handling Add to Cart
}

const CardMenu = ({
  name,
  description,
  image,
  price,
  onAddToCart,
}: CardMenuProps) => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/027/579/683/original/choice-of-fresh-food-and-healthy-eating-vegetables-fruits-legumes-and-cereals-on-a-concrete-table-free-photo.jpg";

  // console.log("image prop:", image);

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Card.Section>
        <Image src={image || defaultImage} height={160} alt={name} />
      </Card.Section>

      <Group justify='space-between' mt='md' mb='xs'>
        <Text fw={500}>{name}</Text>
        <Badge color='pink'>GBP. {price}</Badge>
      </Group>

      <Text size='sm' c='dimmed' className={classes.descriptionBox}>
        {description}
      </Text>

      <Button
        variant='filled'
        color='red.0'
        radius='sm'
        className={classes.cartBtn}
        onClick={onAddToCart} // Attach the handler here
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default CardMenu;
