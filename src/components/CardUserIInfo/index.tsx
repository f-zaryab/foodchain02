import { Card, Text, Badge, Group, Avatar } from "@mantine/core";
import useStore from "../../store/store";
import classes from "./CardUserInfo.module.css";

const CardUserInfo = () => {
  const { user } = useStore();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {user.name ? (
        <Group className={classes.cardContainer}>
          <div className={classes.avatarSection}>
            <div className={classes.avatarSubsectionFirst}>
              <Avatar radius="xl" />
              <Badge color="blue">{user.status.toUpperCase()}</Badge>
            </div>
            <div className={classes.avatarSubsection}>
              <Text size="xl" fw={500}>
                {user.name}
              </Text>
              <Text size="xs" fw={500}>
                {user.email}
              </Text>
              <Text size="xs" fw={500}>
                {user.position.toLocaleLowerCase()}
              </Text>
            </div>
          </div>
        </Group>
      ) : null}
    </Card>
  );
};

export default CardUserInfo;
