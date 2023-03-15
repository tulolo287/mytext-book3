import { Outlet } from "react-router-dom";
import MyHeader from "../modules/MyHeader";

const MainLayout = () => {
  return (
    <>
      <MyHeader /> <Outlet />
      Footer...
    </>
  );
};
export { MainLayout };
