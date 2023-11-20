'use client';

import React, { createContext, useContext, useState } from 'react';

interface ToastContextProps {
    sidebarIsOpen: boolean;
    toggleSidebar: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider');
    }
    return context;
};

type ToastProviderProps = {
    children: React.ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    };

    return (
        <ToastContext.Provider value={{ sidebarIsOpen, toggleSidebar: toggleSidebar }}>
            {children}
        </ToastContext.Provider>
    );
}
