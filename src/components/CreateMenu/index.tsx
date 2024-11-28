import { useEffect, useState } from "react";
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Switch,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
// src
import useStore from "../../store/store";

const CreateMenu = () => {
  const { creatingMenuItemByManager, createdMenuItem } = useStore();
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
    <div>
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
      <h1>Create Menu component</h1>
      <div>
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
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
            label="Is Featured"
            key={form.key("is_featured")}
            {...form.getInputProps("is_featured")}
            style={{ marginTop: 20 }}
          />

          <Group justify="flex-end" mt="md" style={{ marginTop: 20 }}>
            <Button type="submit">Create Menu</Button>
          </Group>
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
