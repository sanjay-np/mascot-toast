// The types of toasts
export type ToastType = 'default' | 'success' | 'error' | 'loading';

// The animation/lifecycle state of the toast
export type ToastState = 'enter' | 'idle' | 'leave';

// The toast object interface
export interface IToast {
    id: number;
    title: string;
    type: ToastType;
    state: ToastState;
    zIndex: number;
}
