import ProgressBar from "../../components/ProgressBar";
import classes from "./Cart.module.css";

const Cart = () => {
  return (
    <div>
      <h1 className={classes.heading}>Cart page</h1>

      <ProgressBar />
    </div>
  );
};

export default Cart;
