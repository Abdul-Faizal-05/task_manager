import Home from "./Home"
import Register from "./Register";
import Login from "./Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
