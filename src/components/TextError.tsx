import React from 'react'

interface Props { }

const TextError: React.FC<Props> = ({ children }) => {
    return (
        <div className="error">
            {children}
        </div>
    )
}

export default TextError