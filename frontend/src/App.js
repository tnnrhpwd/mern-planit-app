import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';    // allows frontend to send user to different pages
import { ToastContainer } from 'react-toastify'                 // container to hold error messages        
import 'react-toastify/dist/ReactToastify.css'    // styling
import Header from './components/Header/Header.jsx'          // header
import Dashboard from './pages/Dashboard.jsx'         // import page

function App() {
  return (
  <>
    <Router>
    <div className='planit-app'>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
  </>
  )
}

export default App;
