import { Card, Text, Badge, Group } from "@mantine/core";
// styles
import classes from "./CardSupplier.module.css";

interface CardSupplierProps {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  payment_terms: string;
  status: string;
}

const CardSupplier = ({
  name,
  contact_person,
  email,
  address,
  phone,
  status,
  payment_terms,
  id,
}: CardSupplierProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder id={id}>
      <Group justify="space-between" mt="md" mb="xs" align="flex-start">
        <div className={classes.textContainer}>
          <Text size="lg" fw={500}>
            {name}
          </Text>
          <Text size="lg" fw={500}>
            {contact_person}
          </Text>
          <Text size="sm" c="dimmed">
            {email}
          </Text>
          <Text size="sm" c="dimmed">
            {address}
          </Text>
          <Text size="sm" c="dimmed">
            {phone}
          </Text>
        </div>
        <div className={classes.badgeContainer}>
          <Badge color="blue" className={classes.badge}>
            {status}
          </Badge>
          <Badge color="indigo" className={classes.badge}>
            {payment_terms}
          </Badge>
        </div>
      </Group>
    </Card>
  );
};

export default CardSupplier;
