import { Outlet } from "react-router-dom";
import classes from "./MainLayout.module.css";
import { HeaderMegaMenu } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

const MainLayout = () => {
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

export default MainLayout;
