// lib
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Group, TextInput, PasswordInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
// src
import useStore from "../../store/store";
import { userTypes } from "../../lib";
// styles
import classes from "./Login.module.css";

const Login = () => {
  const { loginUser, user } = useStore();
  const navigate = useNavigate();

  const data = userTypes;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      role: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 3
          ? "Password must be specified and must be minimum 3 characters in length"
          : null,
      role: (value) => (value === "" ? "Role must be specified" : null),
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (val: any) => {
    // console.log("FinalValues: ", val);
    loginUser(val);
  };

  useEffect(() => {
    // Need to modify it
    if (user?.token) {
      // console.log("User in store >>> ", user);

      if (user.position.toLocaleLowerCase() === "customer") {
        navigate("/dashboard/customer");
      } else if (user.position.toLocaleLowerCase() === "staff") {
        navigate("/dashboard/staff");
      } else if (user.position.toLocaleLowerCase() === "manager") {
        navigate("/dashboard/manager");
      } else if (user.position.toLocaleLowerCase() === "kitchen_staff") {
        navigate("/dashboard/kitchen-staff");
      } else if (user.position.toLocaleLowerCase() === "executive") {
        navigate("/dashboard/executive");
      } else {
        navigate("/not-authorized");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className={classes.loginContainer}>
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="abc@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
          style={{ marginTop: 20 }}
        />

        <PasswordInput
          placeholder="Password"
          label="Password"
          required
          key={form.key("password")}
          {...form.getInputProps("password")}
          style={{ marginTop: 20 }}
        />

        <Select
          withAsterisk
          required
          label="Your role"
          placeholder="Pick your role"
          // defaultValue="customer"
          data={data}
          key={form.key("role")}
          {...form.getInputProps("role")}
          style={{ marginTop: 20 }}
        />

        <Group justify="flex-end" mt="md" style={{ marginTop: 20 }}>
          <Button type="submit" color="red.0">
            Login
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Login;
