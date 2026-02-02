import Home from "./Home"
import Register from "./Register";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
