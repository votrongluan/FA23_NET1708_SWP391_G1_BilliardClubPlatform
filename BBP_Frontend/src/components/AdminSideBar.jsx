import { List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function AdminSideBar() {
  const { auth } = useAuth();
  const navLinkStyle = ({ isActive }) => {
    return {
      borderLeft: isActive ? "3px solid gray" : "none",
      paddingLeft: isActive ? "4px" : "0",
    };
  };

  return (
    <List fontSize="1.2em" spacing={5}>
      <ListItem>
        <NavLink style={navLinkStyle} to={`club`}>
          Quản lý club
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink style={navLinkStyle} to={`staffaccount`}>
          Quản tài khoản nhân viên
        </NavLink>
      </ListItem>
    </List>
  );
}
