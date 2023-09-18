import React from 'react';
import { useState } from 'react'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const [user, setUser] = useState({ name: '', email: '', mobile: '', password: '' })
    const [error,setError] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const auth = getAuth();
        try {
            if(user.name.length < 3 || user.name[0]===' '){
                setError('Enter a valid username')
            }
            else if(user.mobile.length !== 10){
                setError('Enter a valid mobile number')
            }
            else{
                const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
                updateProfile(auth.currentUser, {
                    displayName: user.name
                })
                console.log(userCredential);
                userCredential.user.displayName = user.name
                const db = getFirestore();
                await addDoc(collection(db, "users"), {
                    uid: userCredential.user.uid,
                    displayName: user.name,
                    phone: user.mobile,
                });
                navigate('/login')
            }
        } catch (error) {
            const errorCode = error.code
            const errorMessage = error.message;
            console.log(errorMessage)
            if (errorCode === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            }
            else if(errorCode === 'auth/email-already-in-use'){
                setError('Email Already In Use')
            }
            else if(errorCode === 'auth/invalid-email'){
                setError('Enter a valid email')
            }
        }
    };

    return (
        <div>
            <div className="signupParentDiv">
                <img width="200px" height="200px" src={Logo} alt=''></img>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fname">Username</label>
                    <br />
                    <input className="input" type="text" id="fname" name="name" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    <br />
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input className="input" type="text" id="email" name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <br />
                    <label htmlFor="lname">Phone</label>
                    <br />
                    <input className="input" type="number" id="mobile" name="phone" onChange={(e) => setUser({ ...user, mobile: e.target.value })} />
                    <br />
                    <label htmlFor="lname">Password</label>
                    <br />
                    <input className="input" type="password" id="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <br />
                    <br />
                    {error && <p>{error}</p>}
                    <button type='submit'>Signup</button>
                </form>
                <a href='/login'>Login</a>
            </div>
        </div>
    );
}
