import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignInForm from "./components/SignIn"
import Home from "./components/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
