import { NextPage } from 'next'
import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout: NextPage<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    )
}

export default AuthLayout
