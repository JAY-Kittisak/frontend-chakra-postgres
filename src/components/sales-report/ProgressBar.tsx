import React from 'react'

interface Props {
    width: string
    color: string
}

const ProgressBar: React.FC<Props> = ({ width,color }) => {
    return (
        <div>
            <div className="progress-bar">
                <p>{width}</p>
                <div className="progress">
                    <span style={{ width: width, backgroundColor: color }}></span>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar