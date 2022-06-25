import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';    // allows frontend to send user to different pages
import { ToastContainer } from 'react-toastify'                               // container to hold error messages        
import 'react-toastify/dist/ReactToastify.css'                                // styling
import Header from './components/Header/Header.jsx'                           // header
import About from './pages/About/About.jsx'                                   // import page
import Comments from './pages/Comments.jsx'                                   // import page
import Dashboard from './pages/Dashboard/Dashboard.jsx'                       // import page
import Goals from './pages/Goals/Goals.jsx'                                   // import page
import LegalTerms from './pages/LegalTerms.jsx'                               // import page
import Login from './pages/Login/Login.jsx'                                   // import page
import Plans from './pages/Plans/Plans.jsx'                                   // import page
import Profile from './pages/Profile/Profile.jsx'                             // import page
import Register from './pages/Register/Register.jsx'                          // import page
import Settings from './pages/Settings.jsx'                                   // import page
import InfoGoal from './pages/InfoGoal/InfoGoal.jsx';                         // import page
import InfoPlan from './pages/InfoPlan/InfoPlan.jsx';                         // import page
import InfoAction from './pages/InfoAction/InfoAction.jsx';                   // import page
import Agenda from './pages/Agenda/Agenda.jsx';                               // import page

function App() {
  return (<>
    <Router>
    <div className='planit-app'>
      <Header />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/agenda' element={<Agenda />} />
        <Route path='/comments' element={<Comments />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/goals' element={<Goals />} />
        <Route path='/legal' element={<LegalTerms />} />
        <Route path='/login' element={<Login />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/about' element={<About />} />
        <Route path='/goal/:id/' element={<InfoGoal />} />
        <Route path='/plan/:id/' element={<InfoPlan />} />
        <Route path='/action/:id/' element={<InfoAction />} />
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
  </>)
}

export default App;
