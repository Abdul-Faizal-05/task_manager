import Home from "./Home"
import Home2 from "../Home2";
import Register from "./Register";
import Login from "./Login";
import Tasks from "../Tasks";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/home2" element={<Home2/>}/>
            <Route path="/tasks" element={<Tasks/>}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
