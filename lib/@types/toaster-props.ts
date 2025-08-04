import { ToastType, IToast } from './index';

export interface MascotProps {
    source: string;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    mascotProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export type ToastTypeOptions = {
    [key in ToastType]?: Partial<IToast> & {
        className?: string;
    };
}

export interface ToasterProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    duration?: number;
    theme?: 'light' | 'dark';
    mascot?: MascotProps;
    options?: ToastTypeOptions;
    mode?: 'normal' | 'sequential';
    enableTyping?: boolean;
}
