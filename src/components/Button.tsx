import React, { ButtonHTMLAttributes, forwardRef, Ref } from 'react'

// import Spinner from './Spinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    height?: string
    width?: string
    loading?: boolean
    spinnerColor?: string
    spinnerHeight?: number
    spinnerWidth?: number
}
//FIXME: height = '2.7' คือกำหนดค่าเริ่มต้นให้กับ height
const Button = forwardRef(
    (
        {
            children,
            disabled,
            style,
            className,
            height = '2.7rem',
            width = '9rem',
            loading,
            spinnerColor,
            spinnerHeight,
            spinnerWidth,
            ...props
        }: Props,
        ref: Ref<HTMLButtonElement>
    ) => {
        return (
            <button
                ref={ref}
                className={`btn ${className}`}
                disabled={disabled}
                style={{
                    cursor: loading || disabled ? 'not-allowed' : undefined,
                    height,
                    width,
                    ...style
                }}
                {...props}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    children
                )}
            </button>
        )
    }
)

export default Button
