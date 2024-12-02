import { useEffect } from "react";
import {
  Card,
  Text,
  Badge,
  Divider,
  Group,
  SimpleGrid,
  ScrollArea,
  TextInput,
  Button,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// src
import useStore from "../../store/store";
import { userTypes } from "../../lib";
// styles
import classes from "./AllEmployyes.module.css";

const EmployeeCard = ({
  username,
  email,
  position,
  status,
}: {
  username: string;
  email: string;
  position: string;
  status: string;
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="md" mb="xs">
        <div>
          <Text fw={500}>{username}</Text>
          <Text fw={500}>{email}</Text>
        </div>
        <div className={classes.badgeContainer}>
          <Badge color="blue" className={classes.badge}>
            {position}
          </Badge>
          <Badge color="pink" className={classes.badge}>
            {status}
          </Badge>
        </div>
      </Group>
    </Card>
  );
};

const AllEmployees = () => {
  const data = userTypes;

  const {
    employeeDetail,
    fetchAllEmployees,
    allEmployees,
    creatingEmployeeByManager,
  } = useStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      position: "",
      hire_date: "2024-11-18 14:44:43",
      salary: 0,
      status: "active",
    },

    validate: {
      name: (value) => (value === "" ? "Name must be specified" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 3
          ? "Password must be specified and must be minimum 3 characters in length"
          : null,
      position: (value) => (value === "" ? "Position must be specified" : null),
      hire_date: (value) =>
        value === "" ? "Position must be specified" : null,
      salary: (value) => (value < 0 ? "Salary must be specified" : null),
      status: (value) => (value === "" ? "Position must be specified" : null),
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmitEmployees = (val: any) => {
    creatingEmployeeByManager(val);

    form.reset();
  };

  useEffect(() => {
    if (employeeDetail.position) {
      fetchAllEmployees();
    }
  }, [employeeDetail.position, fetchAllEmployees]);

  return (
    <section className={classes.mainContainer}>
      <h2 className={classes.heading}>Employees</h2>

      {/* --------------------- Getting Employees --------------------- */}
      <Divider
        my="xs"
        label="All Employees"
        labelPosition="center"
        className={classes.labelDivider}
      />

      <ScrollArea h={250} pb={30}>
        <SimpleGrid cols={3} spacing="lg" verticalSpacing="lg">
          {allEmployees.map((item) => (
            <EmployeeCard
              key={item.id}
              username={item.name}
              email={item.email}
              position={item.position}
              status={item.status}
            />
          ))}
        </SimpleGrid>
      </ScrollArea>

      {/* --------------------- Creating Employees --------------------- */}
      <Divider
        my="xs"
        label="Create Employee"
        labelPosition="center"
        className={classes.labelDivider}
      />

      <form
        onSubmit={form.onSubmit((values) => handleFormSubmitEmployees(values))}
        className={classes.formStyles}
      >
        {/* --------------- Name -------------- */}
        <TextInput
          withAsterisk
          label="Name"
          placeholder="e.g. John Smith"
          key={form.key("name")}
          {...form.getInputProps("name")}
          style={{ marginTop: 20 }}
        />

        {/* --------------- Email -------------- */}
        <TextInput
          withAsterisk
          label="Email"
          placeholder="e.g. user@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
          style={{ marginTop: 20 }}
        />

        {/* ----------- Password ------------- */}
        <TextInput
          withAsterisk
          label="password"
          placeholder="*****"
          key={form.key("password")}
          {...form.getInputProps("password")}
          style={{ marginTop: 20 }}
        />

        {/* ----------- Position ------------- */}
        <Select
          withAsterisk
          required
          label="Position"
          placeholder="Position"
          data={data}
          key={form.key("position")}
          {...form.getInputProps("position")}
          style={{ marginTop: 20 }}
        />

        {/* --------------- salary --------------- */}
        <NumberInput
          withAsterisk
          label="Salary"
          placeholder="E.g. 50,000"
          key={form.key("salary")}
          {...form.getInputProps("salary")}
          style={{ marginTop: 20 }}
        />

        {/* ----------- Status ------------- */}
        <TextInput
          withAsterisk
          label="Status"
          placeholder="e.g. active"
          key={form.key("status")}
          {...form.getInputProps("status")}
          style={{ marginTop: 20 }}
        />

        <Group justify="flex-end" mt="md" style={{ marginTop: 20 }}>
          <Button type="submit" color="red.0">
            Create Employee
          </Button>
        </Group>
      </form>
    </section>
  );
};

export default AllEmployees;
