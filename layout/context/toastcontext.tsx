'use client';

import { Toast } from 'primereact/toast';
import React, { RefObject, createContext, useContext, useRef, useState } from 'react';

interface ToastContextProps {
    toast: RefObject<Toast>;
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
    const toast = useRef<Toast>(null);
    return <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>;
}
