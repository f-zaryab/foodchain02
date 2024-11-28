import { Tabs } from "@mantine/core";
// src
import MyDetails from "../../components/MyDetails";
import RestaurantMetrics from "../../components/RestMetrics";
import KitchenList from "../../components/KitchenList";
import CreateMenu from "../../components/CreateMenu";

const ManagerDashboardPage = () => {
  return (
    <div>
      <h1>Manager Dashboard Page</h1>

      <div>
        <Tabs defaultValue="myDetails" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="myDetails">My Details</Tabs.Tab>
            <Tabs.Tab value="restMetric">Restaurant Metrics</Tabs.Tab>
            <Tabs.Tab value="kitchenList">Kitchen List</Tabs.Tab>
            <Tabs.Tab value="createMenu">Create Menu</Tabs.Tab>
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
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
