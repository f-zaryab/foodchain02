import useStore from "../../store/store";
// styles
import classes from "./CustomerDetail.module.css";

const CustomerDetail = () => {
  const { user } = useStore();

  console.log("user", user);

  return (
    <section className={classes.mainContainer}>
      <h2 className={classes.heading}>My details: </h2>
      <div className={classes.textContainer}>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Status: {user.status}</p>
      </div>
    </section>
  );
};

export default CustomerDetail;
