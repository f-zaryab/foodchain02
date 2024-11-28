import { Outlet } from "react-router-dom";
//
import { HeaderMegaMenu } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
// styles
import classes from "./Dashboard.module.css";

const DashboardLayout = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        <HeaderMegaMenu />
      </div>
      <div className={classes.mainOutlet}>
        <Outlet />
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
