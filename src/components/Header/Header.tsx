import {
  Box,
  Burger,
  Button,
  Collapse,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Avatar,
  UnstyledButton,
  Menu,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store/store";

const mockdata = [
  {
    // icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    // icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    // icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    // icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    // icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    // icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened] = useDisclosure(false);
  const { user, logoutUser, cartItems } = useStore();
  const navigate = useNavigate();

  const totalCartItems = cartItems?.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const handleLogout = () => {
    if (user.token) {
      logoutUser();

      navigate("/login");
    }
  };

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <div>
            <Image src="/logo.jpg" w={55} h={55} />
          </div>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>

            <Link to="/about" className={classes.link}>
              About
            </Link>

            <Link to="/cart" className={classes.link}>
              Cart ({totalCartItems || 0})
            </Link>
          </Group>

          {/* Login Button */}
          <Group visibleFrom="sm">
            {user.token ? (
              <Menu shadow="md">
                <Menu.Target>
                  <Avatar
                    color="cyan"
                    radius="xl"
                    style={{ cursor: "pointer" }}
                  >
                    {user?.name
                      ? user?.name[0]?.toUpperCase()
                      : user?.username[0]?.toUpperCase()}
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>
                    <Button color="red.0" onClick={() => handleLogout()}>
                      Logout
                    </Button>
                  </Menu.Label>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button variant="default">
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </Button>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <a href="/" className={classes.link}>
            Home
          </a>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="/about" className={classes.link}>
            Learn
          </a>
          <a href="/login" className={classes.link}>
            Login
          </a>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
