import React, { useState } from 'react'

import '../../styles/alertNt.css'

interface Props { }

type IsShow = "show" | "hide"

const AlertNotification: React.FC<Props> = () => {
    const [warning, setWarning] = useState<IsShow>("show")

    return (
        <div className={`alert ${warning}`}>
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span className="msg">แจ้งเตือน: ไม่สามารถเลือกตัวเลือกนี้ได้!</span>
            <span className="close-btn" onClick={() => setWarning("hide")}>
                <i className="bi bi-x-lg"></i>
            </span>
        </div>
    )
}

export default AlertNotification