
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Volunteer from './Volunteer/App';
import Card from './Card/App';
import Home from './Home/AppBar'

function App() {
  return (
    <div >
      
      <Router>
        <Routes>
          <Route path="/volunteer" element={<Volunteer/>}/>
          <Route path="/card" element={<Card/>}/>
          <Route path="/" element={<Home/>}/>
       </Routes>
     </Router>
    </div>
  );
}

export default App;
