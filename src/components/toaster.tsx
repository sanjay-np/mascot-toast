import React, { useEffect, useMemo, useState } from 'react';
import type { IToast, ToasterProps } from '../types';
import { Toast } from './toast';
import { Store } from '../core/store';
import styles from '../core/styles.module.css';

const Toaster = ({
    position = 'bottom-right',
    theme = 'light',
    options,
    mascotImage,
    mascotPosition = 'right',
    bubbleStyle,
}: ToasterProps) => {
    const [queue, setQueue] = useState<IToast[]>([]);
    const [currentToast, setCurrentToast] = useState<IToast | null>(null);
    const [positionState, setPositionState] = useState<React.CSSProperties>({});

    useEffect(() => {
        const unsubscribe = Store.subscribe((toast) => {
            setQueue((prev) => [...prev, toast]);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!currentToast && queue.length > 0) {
            setCurrentToast(queue[0]);
        }
    }, [queue, currentToast]);

    function handleTypingEnd() {
        setTimeout(() => {
            setCurrentToast(null);
            setQueue((prev) => prev.slice(1));
        }, 10000);
    }

    useEffect(() => {
        const [vertical, horizontal] = position.split('-');
        setPositionState({
            [vertical]: 24,
            [horizontal]: 24,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px'
        });
    }, [position]);

    const toastsToShow = useMemo(() => currentToast ? [currentToast] : [], [currentToast]);

    const bubbleClass = [
        'mascot-toast-bubble',
        `mascot-toast-bubble-${mascotPosition}`
    ].join(' ');

    return (
        <div className={`${styles.mascot_toast_container}  ${styles.mascot_toast_position_bottom_right} `}>
            <div style={positionState}></div>

            {mascotPosition === 'left' && mascotImage && (
                <div className="mascot-wrapper">
                    <img src={mascotImage} alt="mascot" className="mascot" />
                </div>
            )}

            {toastsToShow.length > 0 && (
                <div className={bubbleClass} style={bubbleStyle}>
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

            {mascotPosition === 'right' && mascotImage && (
                <div className="mascot-wrapper">
                    <img src={mascotImage} alt="mascot" className="mascot" />
                </div>
            )}
        </div>
    );
};

export { Toaster };
