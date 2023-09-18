import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthContext} from './store/Context'
import { getAuth, onAuthStateChanged} from "firebase/auth";
import Post from './store/postContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';

function App() {
    const{setUser}=useContext(AuthContext)
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user)
            }
        });
    })
    return (
        <div>
            <Post>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/signup' element={<Signup />}/>
                        <Route path='/login' element={<LoginPage />}/>
                        <Route path='/sell' element={<CreatePage />}/>
                        <Route path='/view' element={<ViewPost/>} />
                    </Routes>
                </Router>
            </Post>
        </div>
    );
}

export default App;
