import React, { useState, useEffect } from 'react';
import { ToastProps } from '../@types/toast-props';

const Toast = React.memo(({ toast, position }: ToastProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Typing effect
    useEffect(() => {
        const text = toast.title;
        const typingSpeed = 60; // ms per character
        let currentIndex = 0;

        // Reset state
        setDisplayedText('');
        setIsTypingComplete(false);

        if (text.length === 0) {
            setIsTypingComplete(true);
            return;
        }

        const typeTimer = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTypingComplete(true);
                clearInterval(typeTimer);
            }
        }, typingSpeed);

        return () => clearInterval(typeTimer);
    }, [toast.title, toast.id]);

    // Animation classes based on state
    const getAnimationClasses = () => {
        switch (toast.state) {
            case 'enter':
                return 'opacity-0 scale-95 translate-y-2';
            case 'idle':
                return 'opacity-100 scale-100 translate-y-0';
            case 'leave':
                return 'opacity-0 scale-95 translate-y-[-8px]';
            default:
                return 'opacity-100 scale-100 translate-y-0';
        }
    };

    // Toast type styling
    const getTypeClasses = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'loading':
                return 'bg-blue-500 text-white';
            case 'default':
            default:
                return toast.theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-900 border border-gray-200 shadow-lg';
        }
    };

    // Tail position based on toaster position
    const getTailClasses = () => {
        const baseClasses = 'w-3 h-3 rotate-45 absolute';
        const colorClasses = toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
                toast.type === 'loading' ? 'bg-blue-500' :
                    toast.theme === 'dark' ? 'bg-gray-800' : 'bg-white border-l border-b border-gray-200';

        switch (position) {
            case 'top-left':
                return `${baseClasses} ${colorClasses} top-1/2 left-0 translate-x-[-50%] translate-y-[-50%]`;
            case 'top-right':
                return `${baseClasses} ${colorClasses} top-1/2 right-0 translate-x-[50%] translate-y-[-50%]`;
            case 'bottom-left':
                return `${baseClasses} ${colorClasses} bottom-1/2 left-0 translate-x-[-50%] translate-y-[50%]`;
            case 'bottom-right':
            default:
                return `${baseClasses} ${colorClasses} top-1/2 right-0 translate-x-[20%] translate-y-[-55%]`;
        }
    };

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'loading':
                return '○';
            default:
                return null;
        }
    };

    return (
        <div
            className={`
                relative max-w-xs px-4 py-3 rounded-xl 
                transition-all duration-300 ease-in-out pointer-events-auto
                right-[80px] top-[-40px]
                ${getTypeClasses()} 
                ${getAnimationClasses()}
                ${toast.className || ''}
            `}
            style={{ zIndex: toast.zIndex }}
        >
            <div className={getTailClasses()}></div>
            <div className="flex items-center gap-2">
                {getIcon() && (
                    <span className={`text-sm font-bold ${toast.type === 'loading' ? 'animate-pulse' : ''}`}>
                        {getIcon()}
                    </span>
                )}
                <span className="text-sm font-medium">
                    {displayedText}
                    {!isTypingComplete && displayedText.length < toast.title.length && (
                        <span className="animate-pulse text-current">|</span>
                    )}
                </span>
            </div>
        </div>
    );
});

Toast.displayName = 'Toast';

export { Toast };