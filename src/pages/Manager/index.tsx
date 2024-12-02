import { Tabs, Divider } from "@mantine/core";
// src
import MyDetails from "../../components/MyDetails";
import RestaurantMetrics from "../../components/RestMetrics";
import KitchenList from "../../components/KitchenList";
import CreateMenu from "../../components/CreateMenu";
import CardUserInfo from "../../components/CardUserIInfo";
import AllEmployees from "../../components/AllEmployees";
// styles
import classes from "./Manager.module.css";

const ManagerDashboardPage = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.infoSection}>
        <h1 className={classes.mainHeading}>Manager: My Dashboard</h1>
        <CardUserInfo />
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
            <Tabs.Tab value="restMetric">Restaurant Metrics</Tabs.Tab>
            <Tabs.Tab value="kitchenList">Kitchen List</Tabs.Tab>
            <Tabs.Tab value="createMenu">Menu</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="myDetails">
            <MyDetails />
          </Tabs.Panel>
          <Tabs.Panel value="restMetric">
            <RestaurantMetrics />
          </Tabs.Panel>
          <Tabs.Panel value="kitchenList">
            <KitchenList />
          </Tabs.Panel>
          <Tabs.Panel value="createMenu">
            <CreateMenu />
          </Tabs.Panel>
          <Tabs.Panel value="employees">
            <AllEmployees />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
