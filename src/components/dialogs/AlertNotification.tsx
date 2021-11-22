import React, { useEffect } from 'react'

import '../../styles/alertNt.css'
import { AlertNt } from '../../utils/helpers'

interface Props {
    warning: string
    setWarning: React.Dispatch<React.SetStateAction<AlertNt>>
}

// type IsShow = "show" | "hide"


// export type AlertNt = "hide" | "success" | "waning"

const AlertNotification: React.FC<Props> = ({ warning, setWarning }) => {

    useEffect(() => {
        if (warning !== "hide") {
            setTimeout(() => {
                setWarning("hide");
            }, 4000);
        }
    }, [warning, setWarning])

    return (
        warning === "hide" ? (
            <div className="alert hide">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span className="msg">แจ้งเตือน: ไม่สามารถเลือกตัวเลือกนี้ได้!</span>
                <span className="close-btn" onClick={() => setWarning("hide")}>
                    <i className="bi bi-x-lg"></i>
                </span>
            </div>
        ) : warning === "waning" ? (
            <div className="alert show">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span className="msg">แจ้งเตือน: ไม่สามารถเลือกตัวเลือกนี้ได้!</span>
            <span className="close-btn" onClick={() => setWarning("hide")}>
                <i className="bi bi-x-lg"></i>
            </span>
        </div>
            ) : (
                <div className="alert-success show">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <span className="msg-success">แจ้งเตือน: ไม่สามารถเลือกตัวเลือกนี้ได้!</span>
                    <span className="close-btn-success" onClick={() => setWarning("hide")}>
                        <i className="bi bi-x-lg"></i>
                    </span>
                </div>
            )
    )
}

export default AlertNotification