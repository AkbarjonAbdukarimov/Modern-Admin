import MainAppBar from './components/AppBar/MainAppBar'
import './App.css'
import SignIn from './components/pages/SignIn'
import { useState } from 'react'
import IAdmin from './interfaces/IAdmin'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
const navlinks = [{ name: 'Home', to: '/' }, { name: 'Dashboard', to: "/dashboard" }, { name: "About", to: '/about' }]
export default function App() {
  const [admin, setAdmin] = useState<IAdmin | undefined>()
  return (
    <div >
      {!admin ?
        <SignIn setAdmin={setAdmin} /> :
        <>
          <BrowserRouter>
            <MainAppBar navlinks={navlinks} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>

        </>}
    </div >
  )
} function Home() {
  const loc = useLocation()
  return (

    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
