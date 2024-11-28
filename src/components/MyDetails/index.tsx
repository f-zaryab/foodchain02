import { useEffect } from "react";
// lib
import useStore from "../../store/store";

const MyDetails = () => {
  const { fetchEmployeeDetail, employeeDetail } = useStore();

  useEffect(() => {
    fetchEmployeeDetail();
  }, [fetchEmployeeDetail]);

  console.log("EmployeeDetail >>> ", employeeDetail);

  return (
    <div style={{ color: "red", fontSize: "1.5rem" }}>
      <h1>My details: </h1>
      <p>ID: {employeeDetail.id}</p>
      <p>Name: {employeeDetail.name}</p>
      <p>Email: {employeeDetail.email}</p>
      <p>Position: {employeeDetail.position}</p>
      <p>Salary: {employeeDetail.salary}</p>
      <p>Status: {employeeDetail.status}</p>
    </div>
  );
};

export default MyDetails;
