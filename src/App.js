
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Volunteer from './companents/Volunteer/App';
import Card from './companents/Card/App';
import Home from './companents/Home/AppBar'
import Search from './companents/search/App'
import LoginPage from './companents/LoginPage/LoginPage';


function App() {
  // Check if localStorage is available in the current environment
  const isLocalStorageAvailable = typeof localStorage !== 'undefined';
  // Function to get users data from localStorage safely
  const getUsersDataFromLocalStorage = () => {
    if (isLocalStorageAvailable) {
      const usersData = localStorage.getItem("users");
      return usersData ? JSON.parse(usersData) : null;
    }
    return null;
  };
  
  const usersData = getUsersDataFromLocalStorage();
  return (
    <div >
      
      <Router>
        <Routes>
        <Route path="/" element={usersData && usersData.uid ? <Home userId={usersData.uid}/> : <LoginPage />}/>
          <Route path="/volunteer" element={<Volunteer/>}/>
          <Route path="/card" element={<Card/>}/>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/search" element={<Search/>}/>
       </Routes>
     </Router>
    </div>
  );
}

export default App;
