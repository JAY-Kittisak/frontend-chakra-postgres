import { useState } from 'react'

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCdc, setIsOpenCdc] = useState(false)

    return { isOpen, setIsOpen, isOpenCdc, setIsOpenCdc }
}