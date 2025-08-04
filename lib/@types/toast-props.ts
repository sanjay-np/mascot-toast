import { IToast } from './index';

export interface ToastProps {
    toast: IToast & {
        className?: string;
        theme?: 'light' | 'dark';
    };
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
