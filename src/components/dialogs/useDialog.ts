import { useState } from 'react'

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false)

    return { isOpen, setIsOpen }
}