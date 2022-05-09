import './App.css'

// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Create from './pages/create/Create'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={ <Dashboard /> } />
            <Route path="/create" element={ <Create /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
            <Route path="/project/:id" element={ <Project /> } />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
