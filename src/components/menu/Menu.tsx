import { FC } from "react";
import { IRoute } from "../../model/IRoute";
import MenuItem from "./menu-item/MenuItem";

type MenuProps = {
  routes: IRoute[];
};
const Menu: FC<MenuProps> = ({ routes }) => {
  return (
    <>
      Menu
      {routes.map((route) => (
        <MenuItem key={route.name} route={route} />
      ))}
    </>
  );
};
export default Menu;
