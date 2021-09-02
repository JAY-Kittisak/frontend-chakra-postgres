import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

type SubName = {
    name: String
    to: String
}

interface Props {
    menuName: string
    to: string
    inconClassName: string
    subMenus: SubName[] | undefined
    onClick: () => void
}


const MenuItem: React.FC<Props> = ({ menuName, to, inconClassName, subMenus, onClick }) => {
    const [expand, setExpand] = useState(false)

    return (
        <li onClick={onClick}>
            <NavLink to={to} onClick={() => setExpand(!expand)} className="menu-item">
                <div className="menu-icon">
                    <i className={inconClassName}></i>
                </div>
                <span>{menuName}</span>
            </NavLink>
            {subMenus && subMenus.length > 0 ? (
                <ul className={`sub-menu ${expand ? "active" : ""}`}>
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

export default MenuItem