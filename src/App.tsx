import {BrowserRouter ,Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
function App() {

  return (
      <div className="bg-slate-950 w-[100vw] min-h-[100vh]">
        <BrowserRouter>
          <Routes>
            <Route  path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </div>  
  )
}

export default App
