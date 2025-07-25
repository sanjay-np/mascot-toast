import { memo, useEffect, useState } from 'react';
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
    if(mascotPosition === 'left') {}
    
    return (
        <div
            key={toast.id}           
            style={{                
                backgroundColor: themeBackground,            
                color: themeFont,
                zIndex: isTop ? 9999 - toast.zIndex : toast.zIndex,                
                border: toast.theme === 'light' ? '1px solid #e5e7eb' : '1px solid #374151',                
                transition: 'all 0.2s',
            }}
        >
            <span>{displayed}</span>
            <span style={triangleStyle} />
        </div>
    );
});

export { Toast };
