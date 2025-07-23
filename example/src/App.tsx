import { Toaster, toast } from 'mascot-toast'
function App() {

    return (
        <>
            <Toaster
                theme="light"
                mascotImage="/owl.png"
                mascotPosition="right"
                bubbleStyle={{ background: '#fffbe7', color: '#222', fontSize: '1.2rem' }}
            />
            <button
                onClick={() => toast('This is a toast.')}
            >
                Create a toast
            </button>
            <button
                onClick={() => toast('Lorem ipsum dolor sit amet, consectetur adipiscing elit')}
            >
                Create a toast
            </button>
        </>
    )
}

export default App
