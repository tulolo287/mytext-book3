import { FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { IRoute } from "../../../model/IRoute";

type MenuItemProps = {
  route: IRoute;
};
const MenuItem: FC<MenuItemProps> = ({ route }) => {
  return (
    <>
      <NavLink to={route.path}>{route.name}</NavLink>
    </>
  );
};

export default MenuItem;
