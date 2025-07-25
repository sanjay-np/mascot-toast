import { Toaster, toast } from 'mascot-toast'
import 'mascot-toast/style.css';
function App() {

    return (
        <>
            <Toaster
                theme="light"
                mascotImage="/owl.png"
                position="bottom-right"
                mascotPosition="right"
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
