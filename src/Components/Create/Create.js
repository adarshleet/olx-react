import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const [details, setDetails] = useState({ name: '', category: '', price: '' })
    const [image, setImage] = useState(null)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = () => {
        const storage = getStorage();
        const storageRef = ref(storage, 'image/' + image.name);
        const date = new Date()

        uploadBytes(storageRef, image)
            .then((snapshot) => {

                getDownloadURL(storageRef)
                    .then((downloadURL) => {
                        const db = getFirestore();
                        console.log(downloadURL)
                        addDoc(collection(db, "products"), {
                            name: details.name,
                            category: details.category,
                            price: details.price,
                            image: downloadURL,
                              date: date.toDateString(),
                            userId: user.uid
                        });
                        navigate("/")
                    })
                    .catch((error) => {
                        console.error("Error getting download URL: ", error);
                    });
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
            });
    };




    return (
        <Fragment>
            <Header />
            <card>
                <div className="centerDiv">
                    {/* <form onSubmit={handleSubmit}> */}
                        <label htmlFor="fname">Name</label>
                        <br />
                        <input className="input" type="text" id="name" name="Name" onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                        <br />
                        <label htmlFor="fname">Category</label>
                        <br />
                        <input className="input" type="text" id="category" name="category" onChange={(e) => setDetails({ ...details, category: e.target.value })} />
                        <br />
                        <label htmlFor="fname">Price</label>
                        <br />
                        <input className="input" type="number" id="price" name="Price" onChange={(e) => setDetails({ ...details, price: e.target.value })} />
                        <br />
                    {/* </form> */}
                    <br />
                    <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
                    {/* <form> */}
                        <br />
                        <input type="file" onChange={handleImageChange} />
                        <br />
                        <button className="uploadBtn" type='submit' onClick={handleSubmit}>upload and Submit</button>
                    {/* </form> */}
                </div>
            </card>
        </Fragment>
    );
};

export default Create;
