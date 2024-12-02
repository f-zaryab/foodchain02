import { Link } from "react-router-dom";
import { Card, Text, Badge } from "@mantine/core";
// styles
import classes from "./KitchenCards.module.css";

interface KitchenCardsProps {
  name: string;
  managerID: string;
  kitchenID: string;
  postcode: string;
  address: string;
  city: string;
  status: string;
  myKitchen?: boolean;
}

const KitchenCards = ({
  name,
  managerID,
  address,
  city,
  postcode,
  status,
  kitchenID,
  myKitchen = false,
}: KitchenCardsProps) => {
  return (
    <Link to={`/dashboard/kitchen/${kitchenID}`}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className={classes.contentWrapper}>
          <div className={classes.textContent}>
            <Text size="lg" fw={500}>
              {name}
            </Text>
            <Text size="sm" c="dimmed">
              {`${address}, ${postcode}, ${city}`}
            </Text>
            <Text size="sm" fw={400}>
              ManagerID: {managerID}
            </Text>
            <Text size="sm" fw={400}>
              KitchenID: {kitchenID}
            </Text>
          </div>
          <div>
            <Badge color="teal">{status}</Badge>
            {myKitchen && <Badge color="indigo">My Kitchen</Badge>}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default KitchenCards;
