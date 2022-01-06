import React, { useState, useEffect } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Text, Avatar, AvatarBadge, Flex } from "@chakra-ui/react";

import MenuItem from "./MenuItem";
import MenuItemFooter from "./MenuItemFooter";
import { useMeQuery } from "../generated/graphql";

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
        name: "Sales Report",
        to: "/sales-report",
        iconClassName: "bi bi-bar-chart-fill"
    },
    // {
    //     name: "Tier",
    //     to: "/tiers/factories",
    //     iconClassName: "bi bi-diagram-3",
    //     subMenus: [{ name: "Product", to: "/tiers/product-tier/all" }],
    // },
    // {
    //     name: "แจ้งงาน IT",
    //     to: "/job-it",
    //     iconClassName: "bi bi-headset",
    //     subMenus: [
    //         { name: "ประวัติการแจ้ง Job IT", to: "/job-it/me" },
    //     ],
    // },
    // {
    //     name: "ของแจกลูกค้า",
    //     to: "/gives/gives-all",
    //     iconClassName: "bi bi-gift-fill",
    //     subMenus: [{ name: "ประวัติการเบิกของคุณ", to: "/order-give/my-orders" }],
    // },
    // {
    //     name: "เบิก-ยืม อุปกรณ์ IT",
    //     to: "/stock-it/stock-all",
    //     iconClassName: "bi bi-basket",
    //     subMenus: [{ name: "ประวัติการเบิกของคุณ", to: "/stock-it/my-order" }],
    // },
    // {
    //     name: "เบิก-ยืม Catalog",
    //     to: "/cat",
    //     iconClassName: "bi bi-basket",
    //     subMenus: [{ name: "ประวัติการเบิกของคุณ", to: "/orderCat/Cat" }],
    // },
    // {
    //     name: "ลางานออนไลน์",
    //     to: "/leave",
    //     iconClassName: "bi bi-calendar2-x",
    //     subMenus: [{ name: "ประวัติการลาของคุณ", to: "/leave/me" }],
    // },
    {
        name: "Resell",
        to: "/resell",
        iconClassName: "bi bi-tools",
        subMenus: [{ name: "ประวัติการบันทึก", to: "/resell/by-me" }],
    },
];

// let fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']


//  Filter array items based on search criteria (query)

// function filterItems(arr: string[], query: string) {
//     return arr.filter(function (el) {
//         return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     })
// }

// console.log(filterItems(fruits, 'ma'))  // ['apple', 'grapes']

const menuItemsFooter = [
    {
        name: "Administrator",
        to: "/admin",
        iconClassName: "bi bi-sliders"
    },
    {
        name: "Setting",
        to: "/todo",
        iconClassName: "bi bi-gear-fill"
    },
    { name: "คู่มือแผนก AD", to: "/manual-ad/factories", iconClassName: "bi bi-file-earmark-pdf" },
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

    let body = null;

    if (fetching) {
        // user not logged in
    } else if (!data?.me) {
        body = (
            <Avatar src={data?.me?.imageUrl as string}>
                <AvatarBadge boxSize="1em" bg="red.500" />
            </Avatar>
        );
    } else {
        body = (
            <>
                <Avatar src={data.me.imageUrl as string}>
                    <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
                <div className="user-info">
                    <Text fontWeight="semibold" isTruncated>{data.me.fullNameTH}</Text>
                    <p>{data.me.email}</p>
                </div>
                <div className="divider"></div>
            </>
        );
    }

    useEffect(() => {
        if (document.body.offsetWidth < 900) {
            setInactive(true)
        }
    }, [])

    return (
        <Flex>
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
            {data?.me && (
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
                </ul>
            </div>
            )}

            {/* {!data?.me || data.me.roles !== ("admin" || "superAdmin") ? null : ( */}
            {/* false-true */}

            {!data?.me || (data.me.roles !== "admin" && data.me.roles !== "superAdmin") ? null : (
                <div className="main-menu-footer">
                    {inactive ? (
                        <p className="menu-admin">AM</p>
                    ) : (
                        <p className="menu-admin">Administrator</p>
                    )}
                    <ul>
                        {menuItemsFooter.map((menuItemsFooter, index) => (
                            <MenuItemFooter
                                inactive={inactive}
                                key={index}
                                menuName={menuItemsFooter.name}
                                to={menuItemsFooter.to}
                                iconClassName={menuItemsFooter.iconClassName}
                                subMenus={[]}
                                onClick={() => {
                                    if (inactive) {
                                        setInactive(false);
                                    }
                                }}
                            />
                        ))}
                    </ul>
                </div>
            )}

            <div className="side-menu-footer">
                <NavLink to="/profile">{body}</NavLink>
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
            </div>
        </div>
        </Flex>
    );
};

export default SideMenu;
