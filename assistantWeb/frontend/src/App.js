
import './App.css';
import Chat from './views/Chat';
import SignIn from './views/SignIn';
import Register from './views/Register'

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import Home from './views/Home';

function App() {
  return (

      <Router>
          <Routes>
            <Route exact path = '/' element={<Home />}/>
            <Route exact path = '/login' element = {<SignIn />} />
            <Route exact path = '/register' element = {<Register />}/>
            <Route exact path = '/chat' element = {<Chat />}></Route>
          </Routes>
      </Router>
  )
}

export default App;
