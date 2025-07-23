export type ToastType = 'default' | 'success' | 'error' | 'loading';

export type ToasterPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export type ToastState = 'enter' | 'idle' | 'leave';

export type ToastOptions = Partial<Pick<IToast, 'style' | 'className'>>;

export type ToasterOptions = ToastOptions & {
    [key in ToastType]?: ToastOptions;
};

export type MascotPosition = 'left' | 'right' | 'bottom' | 'top';

export interface ToasterProps {
    position?: ToasterPosition;
    options?: ToasterOptions;
    duration?: number;
    theme?: 'light' | 'dark';
    mascotImage?: string;
    mascotPosition?: MascotPosition;
    bubbleStyle?: React.CSSProperties;
}

export interface ToastProps {
    toast: IToast;
    position: ToasterPosition;
}

export interface IToast {
    id: string;
    state: ToastState;
    type: ToastType;
    zIndex: number;
    title?: string;
    theme?: 'light' | 'dark';
    style?: string;
    className?: string;
}
