import { useContext } from "react";
import "./NavbarItem.scss";
import { ThemeContext } from "../../../themes/ThemeContext";
import {
  HORIZONTAL_NAVBAR_SHAPE_SLIM,
} from '../../../constants/Constants';

const NavbarItem = (props) => {
  const { name, icon, childs } = props.menuData;

  const {theme} = useContext(ThemeContext);

  return (
    <a
      className={`navbar-top-item relative inline-flex items-center text-xs px-5 py-2`}
    >
      {icon}
      <span className="ml-2">{name}</span>

      
        {childs?.length > 0 && (
            <div className={`absolute -left-1/4 pt-8
              ${theme.horizontalNavbarShape === HORIZONTAL_NAVBAR_SHAPE_SLIM ? 'top-4' : 'top-8'}
            `}>
            <div className="relative navbar-top-collapse-menu text-xs w-52 rounded-xl py-2.5">
              <div
                className={`navbar-top-collapse-menu-arrow w-3.5 h-3.5 rounded-sm absolute rotate-45 -top-2 left-1/4`}
              ></div>
              <ul>
                  {childs.map((item, index) => {
                      return (
                          <li key={index} className={`nav-item py-2 px-4`}>
                              <a>{item.name}</a>
                          </li>
                      )
                  })}
              </ul>
            </div>
          </div>
        )}
      
    </a>
  );
};

export default NavbarItem;
