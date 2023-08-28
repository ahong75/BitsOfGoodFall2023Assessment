import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { UserListPage, UserNotesPage } from './pages'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<UserListPage/>}></Route>
          <Route path='/user/:id' element={<UserNotesPage/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
