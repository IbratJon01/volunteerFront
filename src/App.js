
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Volunteer from './companents/Volunteer/App';
import Card from './companents/Card/App';
import Home from './companents/Home/AppBar'
import Search from './companents/search/App'
function App() {
  return (
    <div >
      
      <Router>
        <Routes>
          <Route path="/volunteer" element={<Volunteer/>}/>
          <Route path="/card" element={<Card/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
       </Routes>
     </Router>
    </div>
  );
}

export default App;
