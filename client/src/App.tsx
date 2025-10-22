import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Pages/LogReg/Login';
import Registration from './components/Pages/LogReg/Registration';
import Main from './components/Pages/Main/Main';
import ProfilePage from './components/Pages/ProfilePage/ProfilePage';
import Follow from './components/Pages/Follows/Follows';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/' element={<Main/>}/>
        <Route path='/profile/:username' element={<ProfilePage/>}/>
        <Route path='/profile/:username/followers' element={<Follow following={false}/>}/>
        <Route path='/profile/:username/followings' element={<Follow following={true}/>}/>
      </Routes>
    </BrowserRouter>
  );

}

