import React, { useState, useEffect } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarBadge } from "@chakra-ui/react"

import MenuItem from "./MenuItem";
import MenuItemFooter from "./MenuItemFooter";
import { useMeQuery } from "../generated/graphql";
import Spinner from "./Spinner"

interface Props {
    onCollapse: (inactive: boolean) => void;
}

const menuItems = [
    {
        name: "Dashboard",
        exact: true,
        to: "/profile",
        iconClassName: "bi bi-speedometer2",
    },
    {
        name: "Administrator",
        to: "/admin",
        iconClassName: "bi bi-sliders",
        subMenus: [
            { name: "จัดการของแจกลูกค้า", to: "/admin/manage-gives" },
            { name: "จัดการ Order ของแจกลูกค้า", to: "/admin/manage-give-orders" },
        ],
    },
    {
        name: "Tier",
        to: "/tiers/factories",
        iconClassName: "bi bi-diagram-3",
        subMenus: [{ name: "Product", to: "/tiers/product-tier" }],
    },
    {
        name: "ของแจกลูกค้า",
        to: "/gives/gives-all",
        iconClassName: "bi bi-gift-fill",
        subMenus: [{ name: "ประวัติการเบิกของคุณ", to: "/order-give/my-orders" }],
    },
    {
        name: "แจ้งงาน It",
        to: "/Job_It",
        iconClassName: "bi bi-headset",
        subMenus: [
            { name: "IT", to: "/แจ้งงาน_IT" },
            { name: "Altas", to: "/แจ้งงาน_Altas" },
        ],
    },
    {
        name: "เบิก-ยืม อุปกรณ์ IT",
        to: "/stock_It",
        iconClassName: "bi bi-basket",
        subMenus: [
            { name: "ประวัติการเบิกของคุณ", to: "/orderIT/IT" },
        ],
    },
    {
        name: "เบิก-ยืม Catalog",
        to: "/cat",
        iconClassName: "bi bi-basket",
        subMenus: [
            { name: "ประวัติการเบิกของคุณ", to: "/orderCat/Cat" },
        ],
    },
];

const menuItemsFooter = [
    { name: "Setting", to: "/setting", iconClassName: "bi bi-gear-fill" },
    {
        name: "Notification",
        to: "/notification",
        iconClassName: "bi bi-bell",
    },
    {
        name: "Apps",
        to: "/apps",
        iconClassName: "bi bi-emoji-smile-fill",
        subMenus: [{ name: "ประวัติการเบิกของคุณ", to: "/order-give/my-orders" }],
    },
];

const SideMenu: React.FC<Props> = ({ onCollapse }) => {
    const [inactive, setInactive] = useState(false);

    const [{ data, fetching }] = useMeQuery();

    useEffect(() => {
        if (inactive) {
            document.querySelectorAll(".sub-menu").forEach((el) => {
                el.classList.remove("active");
            });
        }
        onCollapse(inactive);
    }, [inactive, onCollapse]);

    return (
        // <div className="side-menu inactive">
        <div className={`side-menu ${inactive ? "inactive" : ""}`}>
            <div className="top-section">
                <NavLink to="/">
                <div className="logo">
                    {/* FIXME: แก้รูป */}
                    <img
                        src="https://jsr.co.th/wp-content/uploads/2018/02/Jsr-group-header.png"
                        alt="webscript"
                    />
                    <span>MK Management</span>
                </div>
                {/* <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
                    {inactive ? <HamburgerIcon /> : <i className="bi bi-x-circle-fill"></i>}
                </div> */}
                </NavLink>
            </div>

            <div className="search-controller">
                <button className="search-btn">
                    <Search2Icon />
                </button>
                <input type="text" placeholder="search" />
            </div>

            <div className="divider"></div>

            <div className="main-menu">
                <ul>
                    {menuItems.map((menuItem, index) => (
                        <MenuItem
                            key={index}
                            inactive={inactive}
                            menuName={menuItem.name}
                            exact={menuItem.exact}
                            to={menuItem.to}
                            iconClassName={menuItem.iconClassName}
                            subMenus={menuItem.subMenus || []}
                            onClick={() => {
                                if (inactive) {
                                    setInactive(false);
                                }
                            }}
                        />
                    ))}
                    {/* <li>
                        <a href="/test" className="menu-item">
                            <div className="menu-icon">
                                <StarIcon />
                            </div>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <MenuItem
                        menuName={"Content"}
                        subMenus={[
                            { name: "Courses" },
                            { name: "Videos" }
                        ]}
                    />
                    <li>
                        <a href="/test" className="menu-item">
                            <div className="menu-icon">
                                <EmailIcon />
                            </div>
                            <span>Design</span>
                        </a>
                    </li> */}
                </ul>
            </div>

            <div className="main-menu-footer top">
                <div className="divider"></div>
                <ul>
                    {menuItemsFooter.map((menuItemsFooter, index) => (
                        <MenuItemFooter
                            key={index}
                            menuName={menuItemsFooter.name}
                            to={menuItemsFooter.to}
                            iconClassName={menuItemsFooter.iconClassName}
                            subMenus={menuItemsFooter.subMenus || []}
                            onClick={() => {
                                if (inactive) {
                                    setInactive(false);
                                }
                            }}
                        />
                    ))}
                </ul>
            </div>

            <div className="side-menu-footer">
                <NavLink to="/profile">
                    {fetching || !data?.me ? (
                        <>
                            <div className="avatar">
                                <Spinner color="white" height={30} width={50} />
                            </div>
                            <div className="user-info">
                                <h5>&nbsp;No data...</h5>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* <div className="avatar"> */}
                            <Avatar src={data.me.imageUrl as string}>
                                <AvatarBadge boxSize="1em" bg="green.500" />
                            </Avatar>
                            {/* <img src={data.me.imageUrl as string} alt="user" /> */}
                            {/* <img
                        src="http://200.1.1.99:4000/users/kittisak2021-1629278601111.jpg"
                        alt="user"
                    /> */}
                                {/* </div> */}
                <div className="user-info">
                                    <h5>{data.me.fullNameTH}</h5>
                                    <p>{data.me.email}</p>
                </div>
                        </>
                    )}
                </NavLink>
                <div className="footer-section">
                    <div
                        onClick={() => setInactive(!inactive)}
                        className="toggle-menu-btn"
                    >
                        {inactive ? (
                            <i className="bi bi-chevron-double-right"></i>
                        ) : (
                            <i className="bi bi-chevron-double-left"></i>
                        )}
                    </div>
                </div>

                <div className="divider"></div>
            </div>
        </div>
    );
};

export default SideMenu;