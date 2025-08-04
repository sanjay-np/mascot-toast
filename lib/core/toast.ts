import { ToastStore } from './toast-store';

export const toast = {
    show: (message: string) => ToastStore.add(message, 'default'),
    success: (message: string) => ToastStore.add(message, 'success'),
    error: (message: string) => ToastStore.add(message, 'error'),
    loading: (message: string) => ToastStore.add(message, 'loading'),

    // Show a toast for an async promise lifecycle
    promise: async <T>(
        promiseFn: () => Promise<T>,
        messages: { loading: string; success: string; error: string }
    ): Promise<T> => {
        // Show loading toast
        ToastStore.add(messages.loading, 'loading');

        try {
            const result = await promiseFn();
            // Update current toast to success
            ToastStore.updateCurrentContent(messages.success, 'success');
            return result;
        } catch (error) {
            // Update current toast to error
            ToastStore.updateCurrentContent(messages.error, 'error');
            throw error;
        }
    },

    // Get current queue status (useful for debugging)
    getStatus: () => ({
        current: ToastStore.getCurrent(),
        queueCount: ToastStore.getQueueCount()
    })
};