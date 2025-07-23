import { Toaster, toast } from 'mascot-toast'


function App() {

    return (
        <>
            <Toaster
                image="https://static.vecteezy.com/system/resources/previews/049/974/047/non_2x/cartoon-owl-reading-book-with-glasses-vector.jpg"
            />
            <button onClick={() => toast('This is a toast.')}>Create a toast</button>
        </>
    )
}

export default App
