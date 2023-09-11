import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {slide as Menu} from "react-burger-menu";
import React from "react";
import useWindowDimensions from "../extensions/windowDimensions";

var styles = {
    bmBurgerBars: {
        background: 'white'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#343a40',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmItem: {
        display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    },
};

export default function SideNavbar() {
    const {height, width} = useWindowDimensions();
    if (width <= 575) {
        styles.bmBurgerButton = {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: width - 50,
            top: '10px'
        }
    } else {
        styles.bmBurgerButton = {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '20px'
        }
    }
    return (
        <Menu styles={styles}>
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: '#343a40'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" style={{background: '#8e8e93'}}>
                        Courier Management System
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemIcon as={Link} to={"/couriers"}>
                        <FavoriteBorderIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Couriers"
                        style={{color: "inherit", textDecoration: 'none'}}
                        as={Link} to={"/couriers"}
                    />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon as={Link} to={"/couriers/assign"}>
                        <FavoriteBorderIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Assign Courier"
                        style={{color: "inherit", textDecoration: 'none'}}
                        as={Link} to={"/couriers/assign"}
                    />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon as={Link} to={"/manage"}>
                        <DeleteOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Parcels"
                        style={{color: "inherit", textDecoration: 'none'}}
                        as={Link} to={"/parcels"}
                    />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon as={Link} to={"/route"}>
                        <DeleteOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Routes"
                        style={{color: "inherit", textDecoration: 'none'}}
                        as={Link} to={"/route"}
                    />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon as={Link} to={"/parcels/route"}>
                        <DeleteOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Parcel Routes"
                        style={{color: "inherit", textDecoration: 'none'}}
                        as={Link} to={"/parcels/route"}
                    />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon as={Link} to={"/users"}>
                        <DeleteOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Users"
                        style={{color: "inherit", textDecoration: 'none'}}
                        as={Link} to={"/users"}
                    />
                </ListItemButton>
            </List>
        </Menu>
    )
}