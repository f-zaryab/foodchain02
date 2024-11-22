import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </div>
  );
};

export default MainLayout;
