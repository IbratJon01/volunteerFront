// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VolunteerList from './companents/demo/VolunteerList';
import VolunteerProfile from './companents/demo/VolunteerProfile';
import VolunteerEdit from './companents/demo/VolunteerEdit';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<VolunteerList />} />
//         <Route path="/volunteer/:id" element={<VolunteerProfile />} />
//         <Route path="/volunteer/:id/edit" element={<VolunteerEdit />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;





import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Volunteer from './companents/Volunteer/App';
import Card from './companents/Card/App';
import Home from './companents/Home/AppBar'
import Search from './companents/search/App'
import LoginPage from './companents/LoginPage/LoginPage';
import AccountEdit from './companents/Account/Edit'
import ProfileUsers from './companents/Account/ProfileUsers'
import VList from "./companents/demo/VolunteerList"
import { Switch } from 'react-router-dom';
import HomePage from './companents/page/Home'
import AdminPage from './companents/page/Admin'
import MembersPage from './companents/page/Members'


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
          <Route path="/edit" element={<AccountEdit/>}/>
        <Route path="/user_profile" element={usersData && usersData.uid ? <ProfileUsers userId={usersData.uid}/> : <LoginPage />}/>
        {/* <Route path="/" element={<VList/>}/> */}
          {/* <Route path='user_profile' userId={usersData.uid} element={<ProfileUsers/>}/> */}

        <Route path="/v" element={<VolunteerList />} />
        <Route path="/volunteer/:id"  element={usersData && usersData.uid ? <VolunteerProfile userId={usersData.uid}/> : <LoginPage />} />
        <Route path="/volunteer/:id/edit" element={<AccountEdit />} />
        {/* Boshqa yo'nalishlar uchun ro'talar */}


        <Route path="/admin" element={<AdminPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/home" element={<HomePage />} />

       </Routes>
     </Router>
    </div>
  );
}

export default App;
