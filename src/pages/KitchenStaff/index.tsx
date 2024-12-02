import { Divider, Tabs } from "@mantine/core";
// src
import CardUserInfo from "../../components/CardUserIInfo";
import MyDetails from "../../components/MyDetails";
import KitchenList from "../../components/KitchenList";
import Suppliers from "../../components/SupplierList";
import Inventory from "../../components/Inventory";
// styles
import classes from "./KitchenStaff.module.css";

const KitchenStaffDashboardPage = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.infoSection}>
        <h1 className={classes.mainHeading}>
          <span className={classes.spanHeading}>Kitchen Staff:</span> My
          Dashboard
        </h1>
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
            <Tabs.Tab value="kitchenList">Kitchen List</Tabs.Tab>
            <Tabs.Tab value="supplier">Suppliers</Tabs.Tab>
            <Tabs.Tab value="inventory">Inventory</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="myDetails">
            <MyDetails />
          </Tabs.Panel>
          <Tabs.Panel value="kitchenList">
            <KitchenList />
          </Tabs.Panel>
          <Tabs.Panel value="supplier">
            <Suppliers />
          </Tabs.Panel>
          <Tabs.Panel value="inventory">
            <Inventory />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default KitchenStaffDashboardPage;
