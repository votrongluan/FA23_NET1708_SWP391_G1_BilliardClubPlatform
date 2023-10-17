import {List, ListItem} from "@chakra-ui/react"
import {NavLink} from "react-router-dom"
import useAuth from "../hooks/useAuth.js";


export default function StaffSideBar() {
    const {auth} = useAuth();
    const navLinkStyle = ({isActive}) => {
        return {
            borderLeft: isActive ? '3px solid gray' : 'none',
            paddingLeft: isActive ? '4px' : '0',
        }
    }

    return (
        <List fontSize="1.2em" spacing={5}>
            <ListItem>
                <NavLink style={navLinkStyle} to={`club/${auth?.clubId}`}>
                    Quản lý club
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={navLinkStyle} to={`table/${auth?.clubId}`}>
                    Quản lý bàn
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={navLinkStyle} to={`slot/${auth?.clubId}`}>
                    Quản lý giờ, giá
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={navLinkStyle} to={`booking/${auth?.clubId}`}>
                    Lịch đặt bàn
                </NavLink>
            </ListItem>
        </List>
    )
}
