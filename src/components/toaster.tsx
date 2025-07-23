import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { IToast, ToasterProps, ToastState } from '../types';
import { Toast } from './toast';
import { Store } from '../core/store';

const Toaster = ({
    position = 'bottom-right',
    duration = 3000,
    theme = 'light',
    options,
    image
}: ToasterProps) => {

    const [toasts, setToasts] = useState<IToast[]>([]);
    const [positionState, setPositionState] = useState<React.CSSProperties>({});
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const unsubscribe = Store.subscribe((toast) => {
            setToasts((toasts) => {
                const index = toasts.findIndex((x) => x.id === toast.id);
                if (index === -1) {
                    return [...toasts, toast];
                } else {
                    const copy = [...toasts];
                    copy[index] = toast;
                    return copy;
                }
            });
            handleToast(toast);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const [y, x] = position.split('-');
        setPositionState({
            [y]: 0,
            [x]: 0,
        });
    }, [position]);

    useEffect(() => {
        setHeight(toasts.length * 41);
    }, [toasts]);

    function handleToast(toast: IToast) {
        setTimeout(() => updateToastState(toast, 'idle'), 300);
        if (toast.type === 'loading') return;
        setTimeout(() => updateToastState(toast, 'leave'), duration - 100);
        setTimeout(() => removeToast(toast), duration);
    }

    function updateToastState(toast: IToast, state: ToastState) {
        setToasts((toasts) => {
            const copy = toasts.slice();
            const index = copy.findIndex((x) => x.id === toast.id);
            copy[index] = { ...copy[index], state: state };
            return copy;
        });
    }

    const removeToast = useCallback(
        (toast: IToast) => setToasts((toasts) => toasts.filter((x) => x.id !== toast.id)),
        [],
    );

    const isTop = position.startsWith('top');
    const reversedToasts = useMemo(() => (isTop ? toasts.slice().reverse() : toasts), [isTop, toasts]);

    return (
        <section
            style={{
                position: 'fixed',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                margin: 16,
                transform: 'translateY(0)',
                height: height,
                transition: 'all 230ms cubic-bezier(.21, 1.02, .73, 1)',
                ...positionState,
            }}
        >
            {!isTop && <div className="flex h-full w-full grow" />}
            {reversedToasts.map((toast, index) => (
                <Toast
                    key={toast.id}
                    toast={{ ...toast, zIndex: index, theme, ...options, ...options?.[toast.type] }}
                    position={position}
                />
            ))}
            {isTop && <div className="flex h-full w-full grow" />}
            {image && <img src={image} alt="mascot-image" />}
        </section>
    );
}

export { Toaster }
