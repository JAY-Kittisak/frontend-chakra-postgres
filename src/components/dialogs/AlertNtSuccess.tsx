import React, { useState, useEffect } from 'react'

import { AlertNt } from '../../utils/helpers'
import '../../styles/alertNt.css'

interface Props {
    alertSuccess: string
    setAlertSuccess: React.Dispatch<React.SetStateAction<AlertNt>>
}

const AlertNtSuccess: React.FC<Props> = ({ alertSuccess, setAlertSuccess }) => {

    const [showAlert, setShowAlert] = useState("")

    useEffect(() => {
        if (alertSuccess !== "hide") {

            setShowAlert("showAlert")

            setTimeout(() => {
                setAlertSuccess("hide");
            }, 4000);
        }
    }, [alertSuccess, setAlertSuccess, showAlert])

    return (
        <div className={`alert-success ${showAlert} ${alertSuccess}`}>
            <i className="bi bi-check-circle-fill"></i>
            <span className="msg-success">สำเร็จ : บันทึกข้อมูลเส็จเรียบร้อย</span>
            <span className="close-btn-success" onClick={() => setAlertSuccess("hide")}>
                <i className="bi bi-x-lg"></i>
            </span>
        </div>
    )
}

export default AlertNtSuccess