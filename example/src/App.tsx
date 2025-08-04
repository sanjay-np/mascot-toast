import { useState } from 'react';
import './App.css'
import { Toaster, toast } from 'mascot-toast'


function App() {

    const [status, setStatus] = useState<any>(null);

    const handleShowSequentialToasts = () => {
        // These will show one after another with typing effect
        toast.success('✅ This is a success message with typing effect!');
        toast.error('❌ This error message will appear after the first one completes typing and duration');
        toast.show('ℹ️ This is a longer informational message that will take more time to type out completely');
        toast.loading('🔄 Loading messages stay visible until manually updated');

        // Update status for debugging
        setTimeout(() => setStatus(toast.getStatus()), 100);
    };

    const handlePromiseToast = async () => {
        try {
            await toast.promise(
                // Simulate async operation
                () => new Promise(resolve => setTimeout(resolve, 2000)),
                {
                    loading: '🔄 Processing your request...',
                    success: '✅ Request completed successfully!',
                    error: '❌ Request failed to complete!'
                }
            );
        } catch (error) {
            console.error('Promise failed:', error);
        }
    };

    const handleQuickSequence = () => {
        // Add multiple toasts with varying lengths to test typing timing
        const messages = [
            'Short message',
            'This is a medium length message to test typing',
            'This is a very long message that will take quite a bit of time to type out completely and demonstrate the typing effect',
            'Final message',
            'Done!'
        ];

        messages.forEach((msg, i) => {
            setTimeout(() => {
                toast.show(`${i + 1}. ${msg}`);
            }, i * 100);
        });

        setTimeout(() => setStatus(toast.getStatus()), 600);
    };

    const updateStatus = () => {
        setStatus(toast.getStatus());
    };

    return (
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Sequential Toast System</h1>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <h2 className="font-semibold text-blue-800">How it works with typing effect:</h2>
                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                    <li>• Only one toast shows at a time with a typewriter effect</li>
                    <li>• Total display time = Typing time (50ms per character) + Duration (3s)</li>
                    <li>• Next toast appears immediately after the previous one completes both typing and duration</li>
                    <li>• Loading toasts stay visible until manually updated</li>
                    <li>• A blinking cursor shows during typing</li>
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <button
                        onClick={handleShowSequentialToasts}
                        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Show 4 Sequential Toasts
                    </button>

                    <button
                        onClick={handleQuickSequence}
                        className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        Quick Sequence (5 toasts)
                    </button>

                    <button
                        onClick={handlePromiseToast}
                        className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Promise Toast Demo
                    </button>
                </div>

                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => toast.success('Success! Great job! 🎉')}
                            className="px-3 py-2 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 transition-colors"
                        >
                            Success
                        </button>

                        <button
                            onClick={() => toast.error('An error has occurred! Please try again. 💥')}
                            className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                        >
                            Error
                        </button>

                        <button
                            onClick={() => toast.show('This is an information message with typing effect 📝')}
                            className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                        >
                            Default
                        </button>

                        <button
                            onClick={() => toast.loading('Loading your data, please wait... ⏳')}
                            className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                            Loading
                        </button>
                    </div>

                    <button
                        onClick={updateStatus}
                        className="w-full px-3 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                    >
                        Check Queue Status
                    </button>
                </div>
            </div>

            {/* Debug Status */}
            {status && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Debug Status:</h3>
                    <pre className="text-xs bg-white p-2 rounded overflow-auto">
                        {JSON.stringify(status, null, 2)}
                    </pre>
                </div>
            )}

            {/* Toast container */}
            <Toaster
                position="bottom-right"
                duration={3000} // Each toast shows for 3 seconds AFTER typing completes
                theme="light"
                mascot={{
                    source: './owl.png',
                    containerProps: {
                        className: 'w-[100px] absolute right-0'
                    },                    
                    mascotProps: {
                        className: 'w-[100px] h-[100px] object-cover'
                    }
                }}
            />
        </div>
    );
}

export default App
