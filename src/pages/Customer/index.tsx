import { Divider, Tabs } from "@mantine/core";
import CustomerDetail from "../../components/CustomerDetails";
import CurrentOrders from "../../components/CurrentOrders";
// styles
import classes from "./Customer.module.css";

const CustomerDashboardPage = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.infoSection}>
        <h1 className={classes.mainHeading}>
          <span className={classes.spanHeading}>Customer:</span> My Dashboard
        </h1>
      </div>

      <Divider my="md" />

      <div>
        <Tabs
          defaultValue="myDetails"
          orientation="vertical"
          color="red.0"
          variant="pills"
          radius="lg"
        >
          <Tabs.List className={classes.tabList}>
            <Tabs.Tab value="myDetails">My Details</Tabs.Tab>
            <Tabs.Tab value="currentOrders">Current Orders</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="myDetails">
            <CustomerDetail />
          </Tabs.Panel>
          <Tabs.Panel value="currentOrders">
            <CurrentOrders />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
