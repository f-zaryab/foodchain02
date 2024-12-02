import { useEffect } from "react";
// lib
import useStore from "../../store/store";
// styles
import classes from "./MyDetails.module.css";

const MyDetails = () => {
  const { fetchEmployeeDetail, employeeDetail } = useStore();

  useEffect(() => {
    fetchEmployeeDetail();
  }, [fetchEmployeeDetail]);

  return (
    <section className={classes.mainContainer}>
      <h1 className={classes.heading}>My details: </h1>
      <div className={classes.detailContainer}>
        <p className={classes.paragraph}>ID: {employeeDetail.id}</p>
        <p className={classes.paragraph}>Name: {employeeDetail.name}</p>
        <p className={classes.paragraph}>Email: {employeeDetail.email}</p>
        <p className={classes.paragraph}>Position: {employeeDetail.position}</p>
        <p className={classes.paragraph}>Salary: {employeeDetail.salary}</p>
        <p className={classes.paragraph}>Status: {employeeDetail.status}</p>
      </div>
    </section>
  );
};

export default MyDetails;
