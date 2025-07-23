import React, { useEffect, useMemo, useState } from 'react';
import type { IToast, ToasterProps } from '../types';
import { Toast } from './toast';
import { Store } from '../core/store';
import '../core/styles.css';

const Toaster = ({
    position = 'bottom-right',
    theme = 'light',
    options,
    mascotImage,
    mascotPosition = 'bottom',
    bubbleStyle,
}: ToasterProps) => {
    const [queue, setQueue] = useState<IToast[]>([]);
    const [currentToast, setCurrentToast] = useState<IToast | null>(null);
    const [positionState, setPositionState] = useState<React.CSSProperties>({});

    // Subscribe to new toasts
    useEffect(() => {
        const unsubscribe = Store.subscribe((toast) => {
            setQueue((prev) => [...prev, toast]);
        });
        return unsubscribe;
    }, []);

    // Show one toast at a time
    useEffect(() => {
        if (!currentToast && queue.length > 0) {
            setCurrentToast(queue[0]);
        }
    }, [queue, currentToast]);

    // Remove toast after typing + delay
    function handleTypingEnd() {
        setTimeout(() => {
            setCurrentToast(null);
            setQueue((prev) => prev.slice(1));
        }, 3000);
    }

    // Position the whole container
    useEffect(() => {
        const [vertical, horizontal] = position.split('-');
        setPositionState({
            [vertical]: 24,
            [horizontal]: 24,
        });
    }, [position]);

    // Only show the current toast
    const toastsToShow = useMemo(() => currentToast ? [currentToast] : [], [currentToast]);

    // Build dynamic class names
    const containerClass = [
        'mascot-toast-container',
        `mascot-toast-${mascotPosition}`,
        `mascot-toast-${position}`
    ].join(' ');

    const bubbleClass = [
        'mascot-toast-bubble',
        `mascot-toast-bubble-${mascotPosition}`
    ].join(' ');

    // Layout: mascot at bottom, bubble above (default)
    return (
        <div
            className={containerClass}
            style={{
                ...positionState,
            }}
        >
            {/* Bubble */}
            {toastsToShow.length > 0 && (
                <div
                    className={bubbleClass}
                    style={bubbleStyle}
                >
                    <Toast
                        key={toastsToShow[0].id}
                        toast={{
                            ...toastsToShow[0],
                            theme,
                            ...options,
                            ...options?.[toastsToShow[0].type],
                        }}
                        position={position}
                        onTypingEnd={handleTypingEnd}
                        mascotPosition={mascotPosition}
                    />
                </div>
            )}
            {/* Mascot */}
            {mascotImage && (
                <div className="mascot-wrapper">
                    <img
                        src={mascotImage}
                        alt="mascot"
                        className="mascot"
                    />
                </div>
            )}
        </div>
    );
};

export { Toaster };
