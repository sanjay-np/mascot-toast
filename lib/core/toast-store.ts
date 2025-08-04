import { IToast, ToastType } from '../@types';

type Subscriber = (toast: IToast | null) => void;

class Store {
    private queue: IToast[] = [];
    private currentToast: IToast | null = null;
    private subscribers: Subscriber[] = [];

    subscribe(callback: Subscriber): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    private notify() {
        this.subscribers.forEach(cb => cb(this.currentToast));
    }

    add(message: string, type: ToastType): IToast {
        const toast: IToast = {
            id: Date.now() + Math.random(),
            title: message,
            type,
            state: 'enter',
            zIndex: 999
        };

        // If no current toast, show immediately
        if (!this.currentToast) {
            this.currentToast = toast;
            this.notify();
        } else {
            // Add to queue
            this.queue.push(toast);
        }

        return toast;
    }

    updateCurrentState(state: IToast['state']) {
        if (this.currentToast) {
            this.currentToast = { ...this.currentToast, state };
            this.notify();
        }
    }

    removeCurrent() {
        this.currentToast = null;

        // Show next toast from queue if available
        if (this.queue.length > 0) {
            this.currentToast = this.queue.shift() || null;
        }

        this.notify();
    }

    updateCurrentContent(title: string, type: ToastType) {
        if (this.currentToast) {
            this.currentToast = {
                ...this.currentToast,
                title,
                type,
                state: 'idle'
            };
            this.notify();
        }
    }

    getCurrent(): IToast | null {
        return this.currentToast;
    }

    getQueueCount(): number {
        return this.queue.length;
    }

    // Calculate typing duration
    getTypingDuration(text: string): number {
        return text.length * 100; // 100ms per character
    }
}

export const ToastStore = new Store();