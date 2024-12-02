import { useEffect } from "react";
import {
  Button,
  Divider,
  Group,
  ScrollArea,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// src
import CardSupplier from "../CardSupplier";
import useStore from "../../store/store";
// styles
import classes from "./SupplierList.module.css";

const Suppliers = () => {
  const { employeeDetail, suppliers, fetchSupplierList, createSupplier } =
    useStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      phone: "+1 555-123-4567",
      address: "",
      contact_person: "",
      payment_terms: "Net 30",
      status: "ACTIVE",
    },

    validate: {
      name: (value) => (value === "" ? "Name must be specified" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value === "" ? "Phone must be specified" : null),
      address: (value) => (value === "" ? "Position must be specified" : null),
      contact_person: (value) =>
        value === "" ? "Position must be specified" : null,
      payment_terms: (value) =>
        value === "" ? "Position must be specified" : null,
      status: (value) => (value === "" ? "Position must be specified" : null),
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmitSupplier = (val: any) => {
    createSupplier(val);

    form.reset();
  };

  useEffect(() => {
    if (employeeDetail.position) {
      fetchSupplierList();
    }
  }, [employeeDetail.position, fetchSupplierList]);

  return (
    <section className={classes.mainContainer}>
      <h2 className={classes.heading}>Suppliers List</h2>

      {/* --------------------- Getting Supplier List --------------------- */}
      <Divider
        my="xs"
        label="All Suppliers"
        labelPosition="center"
        className={classes.labelDivider}
      />

      <ScrollArea h={250} pb={30}>
        <SimpleGrid cols={3} spacing="lg" verticalSpacing="lg">
          {suppliers.map((item) => (
            <CardSupplier
              key={item.id}
              id={item.id}
              name={item.name}
              contact_person={item.contact_person}
              email={item.email}
              address={item.address}
              phone={item.phone}
              payment_terms={item.payment_terms}
              status={item.status}
            />
          ))}
        </SimpleGrid>
      </ScrollArea>

      {/* --------------------- Adding Suppliers --------------------- */}
      <Divider
        my="xs"
        label="Create Supplier"
        labelPosition="center"
        className={classes.labelDivider}
      />

      <form
        onSubmit={form.onSubmit((values) => handleFormSubmitSupplier(values))}
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

        {/* ----------- Phone ------------- */}
        <TextInput
          withAsterisk
          label="Phone"
          placeholder="+92 4555 0032"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
          style={{ marginTop: 20 }}
        />

        {/* --------------- address --------------- */}
        <TextInput
          withAsterisk
          label="Adress"
          placeholder="e.g. reaturant address"
          key={form.key("address")}
          {...form.getInputProps("address")}
          style={{ marginTop: 20 }}
        />

        {/* ----------- contact_person ------------- */}
        <TextInput
          withAsterisk
          label="contact_person"
          placeholder="e.g. Adam smith"
          key={form.key("contact_person")}
          {...form.getInputProps("contact_person")}
          style={{ marginTop: 20 }}
        />

        {/* ----------- payment_terms ------------- */}
        <TextInput
          withAsterisk
          label="payment_terms"
          placeholder="e.g. Adam smith"
          key={form.key("payment_terms")}
          {...form.getInputProps("payment_terms")}
          style={{ marginTop: 20 }}
        />

        {/* ----------- status ------------- */}
        <TextInput
          withAsterisk
          label="status"
          placeholder="e.g. Adam smith"
          key={form.key("status")}
          {...form.getInputProps("status")}
          style={{ marginTop: 20 }}
        />

        <Group justify="flex-end" mt="md" style={{ marginTop: 20 }}>
          <Button type="submit" color="red.0">
            Create supplier
          </Button>
        </Group>
      </form>
    </section>
  );
};

export default Suppliers;
