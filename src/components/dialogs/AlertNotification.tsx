import React, { useEffect, useState } from 'react'

import '../../styles/alertNt.css'
import { AlertNt } from '../../utils/helpers'

interface Props {
    alertWarning: string
    setAlertWarning: React.Dispatch<React.SetStateAction<AlertNt>>
}

const AlertNotification: React.FC<Props> = ({ alertWarning, setAlertWarning }) => {

    const [showAlert, setShowAlert] = useState("")

    useEffect(() => {
        if (alertWarning !== "hide") {

            setShowAlert("showAlert")

            setTimeout(() => {
                setAlertWarning("hide");
            }, 4000);
        }
    }, [alertWarning, setAlertWarning, showAlert])

    return (
        <div className={`alert ${showAlert} ${alertWarning}`}>
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span className="msg">แจ้งเตือน: ไม่สามารถเลือกตัวเลือกนี้ได้!</span>
            <span className="close-btn" onClick={() => setAlertWarning("hide")}>
                <i className="bi bi-x-lg"></i>
            </span>
        </div>
    )
}

export default AlertNotification