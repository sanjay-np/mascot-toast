import { memo } from 'react';
import '../core/styles.css';
import type { ToastProps } from '../types';

const Toast = memo(({ toast, position }: ToastProps) => {

    const isTop = position.startsWith('top');

    return (
        <div
            key={toast.id}
            className={`toast-${isTop ? 'top' : 'bottom'}-${toast.state} ${toast.className}`}
            style={{
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                borderRadius: '0.375rem',
                fontWeight: 500,
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                zIndex: isTop ? 9999 - toast.zIndex : toast.zIndex,
                display: 'flex',
                gap: 4,
                minWidth: 220,
                position: 'relative',
                alignItems: 'center',
            }}
        >
            {toast.title}
        </div>
    );
});

export { Toast };
