import { useEffect, useRef, useState } from 'react';
import { IToast } from '../@types';
import { ToasterProps } from '../@types/toaster-props';
import { ToastStore } from '../core/toast-store';
import { Toast } from './Toast';

export const Toaster = ({
    position = 'bottom-right',
    duration = 3000,
    theme = 'light',
    mascot,
    options
}: ToasterProps) => {
    const [currentToast, setCurrentToast] = useState<IToast | null>(null);
    const removeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Subscribe to toast store changes
    useEffect(() => {
        const unsubscribe = ToastStore.subscribe((toast) => {
            setCurrentToast(toast);
        });
        return unsubscribe;
    }, []);

    // Handle toast lifecycle when currentToast changes
    useEffect(() => {
        if (!currentToast) {
            if (removeTimerRef.current) {
                clearTimeout(removeTimerRef.current);
                removeTimerRef.current = null;
            }
            return;
        }

        // Clear any existing timer
        if (removeTimerRef.current) {
            clearTimeout(removeTimerRef.current);
        }

        // Step 1: Enter -> Idle (after 500ms)
        setTimeout(() => {
            ToastStore.updateCurrentState('idle');
        }, 500);

        // Step 2: Calculate total duration (typing + display duration)
        const typingDuration = ToastStore.getTypingDuration(currentToast.title);
        const totalDuration = typingDuration + duration;

        // Step 3: Only auto-dismiss non-loading toasts
        if (currentToast.type !== 'loading') {
            // Start leave animation before removing
            setTimeout(() => {
                ToastStore.updateCurrentState('leave');
            }, totalDuration - 300);

            // Remove toast and show next
            removeTimerRef.current = setTimeout(() => {
                ToastStore.removeCurrent();
            }, totalDuration);
        }

        // Cleanup function
        return () => {
            if (removeTimerRef.current) {
                clearTimeout(removeTimerRef.current);
                removeTimerRef.current = null;
            }
        };
    }, [currentToast?.id, duration]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (removeTimerRef.current) {
                clearTimeout(removeTimerRef.current);
            }
        };
    }, []);

    const getPositionClasses = () => {
        const baseClasses = 'fixed z-[999] flex pointer-events-none p-4';

        switch (position) {
            case 'top-left':
                return `${baseClasses} top-0 left-0`;
            case 'top-right':
                return `${baseClasses} top-0 right-0`;
            case 'bottom-left':
                return `${baseClasses} bottom-0 left-0 flex-col-reverse`;
            case 'bottom-right':
            default:
                return `${baseClasses} bottom-0 right-0 flex-col-reverse`;
        }
    };

    return (
        <div className={getPositionClasses()}>
            {currentToast && (
                <Toast
                    toast={{
                        ...currentToast,
                        theme,
                        ...options?.[currentToast.type],
                    }}
                    position={position}
                />
            )}

            {mascot?.source && (
                <div {...mascot.containerProps}>
                    <img
                        src={mascot.source}
                        {...mascot.mascotProps}
                        alt="Mascot"
                    />
                </div>
            )}
        </div>
    );
};