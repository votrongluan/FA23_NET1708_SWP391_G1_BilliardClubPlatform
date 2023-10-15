import {List, ListItem} from "@chakra-ui/react"
import {NavLink} from "react-router-dom"


export default function StaffSideBar() {
    const navLinkStyle = ({isActive}) => {
        return {
            borderLeft: isActive ? '3px solid blue' : 'none',
            paddingLeft: isActive ? '4px' : '0',
        }
    }

    return (
        <List fontSize="1.2em" spacing={5}>
            <ListItem>
                <NavLink style={navLinkStyle} to="club">
                    Quản lý club
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={navLinkStyle} to="table">
                    Quản lý bàn
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={navLinkStyle} to="slot">
                    Quản lý giờ, giá
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink style={navLinkStyle} to="booking">
                    Lịch đặt bàn
                </NavLink>
            </ListItem>
        </List>
    )
}
