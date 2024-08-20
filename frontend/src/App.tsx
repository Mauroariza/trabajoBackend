
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import DeviceDetailPage from './pages/DeviceDetailPage'
import AdminPanel from './pages/AdminPanel'
import NavBar from './components/Navbar'
function App() {


  return (
   <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/device/:id' element={<DeviceDetailPage/>} />
        <Route path='/admin' element={<AdminPanel/>} />
      </Routes>
   </Router>
  )
}

export default App
