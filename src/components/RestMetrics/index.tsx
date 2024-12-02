import { useEffect } from "react";
// lib
import useStore from "../../store/store";
// styles
import classes from "./RestMetrics.module.css";

const RestaurantMetrics = () => {
  const { fetchRestMetrics, restMetrics, employeeDetail } = useStore();

  useEffect(() => {
    if (employeeDetail.restaurant_id) {
      fetchRestMetrics(employeeDetail.restaurant_id);
    }
  }, [employeeDetail.restaurant_id, fetchRestMetrics]);

  return (
    <section className={classes.mainContainer}>
      <h1 className={classes.heading}>Restaurant Metrics</h1>
      {restMetrics?.length > 0 && (
        <div style={{ color: "red", fontSize: "1.5rem" }}>
          <p>Restaurant ID: {restMetrics[0]?.restaurant_id}</p>
          <p>
            Total Orders Completed: {restMetrics[0]?.total_orders_completed}
          </p>
          <p>Daily Revenue: {restMetrics[0]?.daily_revenue}</p>
          <p>Avg. Order Value: {restMetrics[0]?.average_order_value}</p>
        </div>
      )}
    </section>
  );
};

export default RestaurantMetrics;
