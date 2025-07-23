import { memo, useEffect, useState } from 'react';
import '../core/styles.css';
import type { ToastProps } from '../types';

const TYPING_SPEED = 30; // ms per character

type ToastWithTypingProps = ToastProps & {
    onTypingEnd?: () => void;
    mascotPosition?: 'left' | 'right' | 'bottom' | 'top';
};

const Toast = memo(({ toast, position, onTypingEnd, mascotPosition = 'bottom' }: ToastWithTypingProps) => {
    const themeBackground = toast.theme === 'light' ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)';
    const themeFont = toast.theme === 'light' ? 'rgb(17, 24, 39)' : 'rgb(243, 244, 246)';
    const isTop = position.startsWith('top');

    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        setDisplayed('');
        const title = toast.title ?? '';
        if (!title) {
            onTypingEnd?.();
            return;
        }
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayed(title.slice(0, i));
            if (i >= title.length) {
                clearInterval(interval);
                onTypingEnd?.(); // <-- Only called after typing is done
            }
        }, TYPING_SPEED);
        return () => clearInterval(interval);
    }, [toast.title, toast.id, onTypingEnd]);

    // Triangle style based on mascot position
    let triangleStyle: React.CSSProperties = {};
    if (mascotPosition === 'right') {
        triangleStyle = {
            position: 'absolute',
            right: -16,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderLeft: `16px solid ${themeBackground}`,
        };
    } else if (mascotPosition === 'left') {
        triangleStyle = {
            position: 'absolute',
            left: -16,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: '12px solid transparent',
            borderBottom: '12px solid transparent',
            borderRight: `16px solid ${themeBackground}`,
        };
    } else if (mascotPosition === 'top') {
        triangleStyle = {
            position: 'absolute',
            left: '50%',
            top: -16,
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: `16px solid ${themeBackground}`,
        };
    } else {
        // bottom (default)
        triangleStyle = {
            position: 'absolute',
            left: '50%',
            top: '100%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `16px solid ${themeBackground}`,
        };
    }

    return (
        <div
            key={toast.id}
            className={`toast-dialog-bubble toast-${isTop ? 'top' : 'bottom'}-${toast.state} ${toast.className}`}
            style={{
                padding: '1rem 1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: themeBackground,
                fontWeight: 500,
                fontSize: '1rem',
                lineHeight: '1.5rem',
                color: themeFont,
                zIndex: isTop ? 9999 - toast.zIndex : toast.zIndex,
                display: 'inline-block',
                minWidth: 220,
                maxWidth: 400,
                position: 'relative',
                alignItems: 'center',
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                border: toast.theme === 'light' ? '1px solid #e5e7eb' : '1px solid #374151',
                margin: '0.5rem 0',
                transition: 'all 0.2s',
            }}
        >
            <span>{displayed}</span>
            <span style={triangleStyle} />
        </div>
    );
});

export { Toast };
