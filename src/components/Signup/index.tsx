// lib
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Group,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// src
import useStore from "../../store/store";
// styles
import classes from "./Signup.module.css";

const Signup = () => {
  const { signupUser, user } = useStore();
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      keepingLoggedIn: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (val: any) => {
    // console.log("FinalValues: ", val);
    signupUser(val);
  };

  useEffect(() => {
    if (user?.token) {
      console.log("User in store >>> ", user);

      if (user.position.toLocaleLowerCase() === "customer") {
        navigate("/dashboard/customer");
      } else if (user.position.toLocaleLowerCase() === "staff") {
        navigate("/dashboard/staff");
      } else if (user.position.toLocaleLowerCase() === "manager") {
        navigate("/dashboard/manager");
      } else if (user.position.toLocaleLowerCase() === "kitchen-staff") {
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
    <div className={classes.signupContainer}>
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="My first name"
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />

        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="My last name"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
          style={{ marginTop: 20 }}
        />

        <TextInput
          withAsterisk
          label="Username"
          placeholder="my username"
          key={form.key("username")}
          {...form.getInputProps("username")}
          style={{ marginTop: 20 }}
        />

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
          //   description="Password must include at least one letter, number and special character"
          required
          key={form.key("password")}
          {...form.getInputProps("password")}
          style={{ marginTop: 20 }}
        />

        <Checkbox
          mt="md"
          label="Keep me logged in"
          key={form.key("keepingLoggedIn")}
          {...form.getInputProps("keepingLoggedIn", { type: "checkbox" })}
          style={{ marginTop: 30 }}
        />

        <Group justify="flex-end" mt="md" style={{ marginTop: 20 }}>
          <Button type="submit">Sign up</Button>
        </Group>
      </form>
    </div>
  );
};

export default Signup;
