import { useEffect, useState } from "react";
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Switch,
  Alert,
  Divider,
  Grid,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
// src
import CardMenuSimple from "../CardMenuSimple";
import useStore from "../../store/store";
// styles
import classes from "./CreateMenu.module.css";

const CreateMenu = () => {
  const { creatingMenuItemByManager, createdMenuItem, menuItems } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      preparation_time: "2024-11-18 14:44:43",
      calories: "",
      allergens: "",
      status: "",
      is_featured: false,
    },

    validate: {
      name: (value) => (value === "" ? "Role must be specified" : null),
      description: (value) => (value === "" ? "Role must be specified" : null),
      price: (value) => (value === "" ? "Role must be specified" : null),
      image: (value) => (value === "" ? "Role must be specified" : null),
      calories: (value) => (value === "" ? "Role must be specified" : null),
      allergens: (value) => (value === "" ? "Role must be specified" : null),
      status: (value) => (value === "" ? "Role must be specified" : null),
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (val: any) => {
    creatingMenuItemByManager(val);

    form.reset();
  };

  useEffect(() => {
    if (createdMenuItem.length > 0) {
      setShowNotifications(true);
    }
  }, [createdMenuItem.length]);

  return (
    <section className={classes.mainContainer}>
      {showNotifications && (
        <div
          style={{
            position: "absolute",
            top: "4rem",
            right: "2rem",
            width: "auto",
            height: "auto",
          }}
        >
          <Alert
            variant="filled"
            color="blue"
            radius="xs"
            withCloseButton
            title="Menu item created successfully"
            onClose={() => {
              console.log("X Being clicked...");
              setShowNotifications(false);
            }}
          >
            <Link to="/">See the created menu on home page</Link>
          </Alert>
        </div>
      )}

      <h1 className={classes.heading}>Menu</h1>

      <div id="current-menu">
        <Divider
          my="xs"
          label="Current Menu"
          labelPosition="center"
          className={classes.labelDivider}
        />
        <div>
          <ScrollArea h={350} scrollbars="y">
            {menuItems.length > 0 ? (
              <Grid>
                {menuItems.map((item) => (
                  <Grid.Col span={3} key={item.id}>
                    <CardMenuSimple
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      isFeatured={Boolean(item.is_featured)}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            ) : (
              <p>No items to display</p>
            )}
          </ScrollArea>
        </div>
      </div>

      <div>
        <Divider
          my="xs"
          label="Create Menu"
          labelPosition="center"
          className={classes.labelDivider}
        />
        <form
          onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
          className={classes.formStyles}
        >
          {/* --------------- Name -------------- */}
          <TextInput
            withAsterisk
            label="Name"
            placeholder="e.g. salad"
            key={form.key("name")}
            {...form.getInputProps("name")}
            style={{ marginTop: 20 }}
          />

          {/* ----------- Description ------------- */}
          <TextInput
            withAsterisk
            label="description"
            placeholder="e.g. salad is good"
            key={form.key("description")}
            {...form.getInputProps("description")}
            style={{ marginTop: 20 }}
          />

          {/* --------------- Price --------------- */}
          <NumberInput
            withAsterisk
            label="Price"
            placeholder="E.g. 9.99"
            key={form.key("price")}
            {...form.getInputProps("price")}
            style={{ marginTop: 20 }}
          />

          {/* --------------- Image --------------- */}
          <TextInput
            withAsterisk
            label="Image"
            placeholder="e.g. www.google.com/image"
            key={form.key("image")}
            {...form.getInputProps("image")}
            style={{ marginTop: 20 }}
          />

          {/* --------------- Calories --------------- */}
          <NumberInput
            withAsterisk
            label="Calories"
            placeholder="E.g. 425"
            key={form.key("calories")}
            {...form.getInputProps("calories")}
            style={{ marginTop: 20 }}
          />

          {/* ----------- Allergence ------------- */}
          <TextInput
            withAsterisk
            label="allergens"
            placeholder="e.g. nuts"
            key={form.key("allergens")}
            {...form.getInputProps("allergens")}
            style={{ marginTop: 20 }}
          />

          {/* ----------- Status ------------- */}
          <TextInput
            withAsterisk
            label="Status"
            placeholder="e.g. available"
            key={form.key("status")}
            {...form.getInputProps("status")}
            style={{ marginTop: 20 }}
          />

          {/* ----------- Is Featured ------------- */}
          <Switch
            defaultChecked
            color="red.0"
            label="Is Featured"
            key={form.key("is_featured")}
            {...form.getInputProps("is_featured")}
            style={{ marginTop: 20 }}
          />

          <Group justify="flex-end" mt="md" style={{ marginTop: 20 }}>
            <Button type="submit" color="red.0">
              Create Menu
            </Button>
          </Group>
        </form>
      </div>
    </section>
  );
};

export default CreateMenu;
