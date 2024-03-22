import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
}

const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;