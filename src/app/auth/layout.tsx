import React from 'react'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            {children}
            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-1/3 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-500" />
        </div>
    )
}

export default layout