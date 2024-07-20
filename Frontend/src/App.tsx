import { Home } from "./components/Home"
import { LogIn } from "./components/LogIn"
import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import { SignUp } from "./components/SignUp"
function App() {
  return (
    <div className="bg-neutral-950">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App