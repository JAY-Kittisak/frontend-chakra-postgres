import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

type SubName = {
    name: String
    to: String
}

interface Props {
    menuName: string
    to: string
    iconClassName: string
    subMenus: SubName[] | undefined
    onClick: () => void
}


const MenuItemFooter: React.FC<Props> = ({ menuName, to, iconClassName, subMenus, onClick }) => {
    const [expand, setExpand] = useState(false)

    return (
        <li onClick={onClick}>
            <NavLink to={to} onClick={() => setExpand(!expand)} className="menu-item-footer">
                <div className="menu-icon-footer">
                    <i className={iconClassName}></i>
                </div>
                <span>{menuName}</span>
            </NavLink>
            {subMenus && subMenus.length > 0 ? (
                <ul className={`sub-menu-footer ${expand ? "active" : ""}`}>
                    {subMenus.map((menu, index) => (
                        <li key={index}>
                            <NavLink to={`${menu.to}`}>{menu.name}</NavLink>
                        </li>
                    ))}
                </ul>
            ) : null}
        </li>
    )
}

export default MenuItemFooter