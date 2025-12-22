'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    // Return no-op functions when context is not available (e.g., during SSR or before hydration)
    if (!context) {
        return {
            success: () => { },
            error: () => { },
            warning: () => { },
            info: () => { }
        };
    }
    return context;
};

const ToastItem = ({ toast, onRemove }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-400" />,
        error: <AlertCircle className="w-5 h-5 text-red-400" />,
        warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
        info: <Info className="w-5 h-5 text-blue-400" />
    };

    const bgColors = {
        success: 'bg-green-900/80 border-green-500/50',
        error: 'bg-red-900/80 border-red-500/50',
        warning: 'bg-yellow-900/80 border-yellow-500/50',
        info: 'bg-blue-900/80 border-blue-500/50'
    };

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg ${bgColors[toast.type]} animate-slide-in`}
        >
            {icons[toast.type]}
            <p className="text-white text-sm font-medium flex-1">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="text-gray-400 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = {
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        info: (message, duration) => addToast(message, 'info', duration)
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
                {toasts.map(t => (
                    <ToastItem key={t.id} toast={t} onRemove={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
