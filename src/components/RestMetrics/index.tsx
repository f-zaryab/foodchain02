import { useEffect } from "react";
import { Card, Divider, SimpleGrid, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
// lib
import useStore from "../../store/store";
// styles
import classes from "./RestMetrics.module.css";

const CardRest = ({
  RestID,
  totalOrdComplted,
  dailyRev,
  AvgOrdVal,
}: {
  RestID: string;
  totalOrdComplted: string;
  dailyRev: string;
  AvgOrdVal: string;
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <div className={classes.execardContainer}>
        <Text size="xs" fw={500}>
          Restaurant ID: {RestID}
        </Text>
        <Text fw={500}>Total Orders Completed: {totalOrdComplted}</Text>
        <Text fw={500}>Daily Revenue: {dailyRev}</Text>
        <Text fw={500}>Average Order Value: {AvgOrdVal}</Text>
      </div>
    </Card>
  );
};

const RestaurantMetrics = () => {
  const {
    fetchRestMetrics,
    restMetrics,
    employeeDetail,
    fetchRestMetricsAllExec,
    restMetricsExecAll,
  } = useStore();

  useEffect(() => {
    if (employeeDetail.restaurant_id) {
      fetchRestMetrics(employeeDetail.restaurant_id);
    }
  }, [employeeDetail.restaurant_id, fetchRestMetrics]);

  useEffect(() => {
    if (employeeDetail?.position === "EXECUTIVE") {
      fetchRestMetricsAllExec();
    }
  }, [employeeDetail.position, fetchRestMetricsAllExec]);

  return (
    <section className={classes.mainContainer}>
      <h1 className={classes.heading}>Restaurant Metrics</h1>

      {/* All restaurants only for Executive, not manager */}
      {employeeDetail?.position === "EXECUTIVE" ? (
        <SimpleGrid cols={3} mb={32}>
          {restMetricsExecAll.map((item) => (
            <CardRest
              key={item.id}
              RestID={item.restaurant_id}
              AvgOrdVal={item.average_order_value}
              dailyRev={item.daily_revenue}
              totalOrdComplted={item.total_orders_completed}
            />
          ))}
        </SimpleGrid>
      ) : null}

      {/* Current Restaurant Metrics */}
      <Divider
        my="xs"
        label="Current Restaurant Metrics"
        labelPosition="center"
        className={classes.labelDivider}
      />

      {restMetrics?.length > 0 && (
        <div className={classes.statsSummary}>
          <p>Restaurant ID: {restMetrics[0]?.restaurant_id}</p>
          <p>
            Total Orders Completed: {restMetrics[0]?.total_orders_completed}
          </p>
          <p>Daily Revenue: {restMetrics[0]?.daily_revenue}</p>
          <p>Avg. Order Value: {restMetrics[0]?.average_order_value}</p>

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <BarChart
              h={400}
              w={400}
              data={[
                {
                  month: "Current Month",
                  TotalOrdersCompleted: restMetrics[0]?.total_orders_completed,
                  DailyRevenue: restMetrics[0]?.daily_revenue,
                  AvgOrderValue: restMetrics[0]?.average_order_value,
                },
              ]}
              dataKey="month"
              series={[
                { name: "TotalOrdersCompleted", color: "violet.6" },
                { name: "DailyRevenue", color: "blue.6" },
                { name: "AvgOrderValue", color: "teal.6" },
              ]}
              withTooltip={false}
              withBarValueLabel
              valueLabelProps={{
                position: "center",
                fill: "black",
                fontSize: "1.5rem",
              }}
              tickLine="xy"
              gridAxis="xy"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default RestaurantMetrics;
