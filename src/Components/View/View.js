import React, { useState, useEffect, useContext } from 'react';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import './View.css';
import { PostContext } from '../../store/postContext';
function View() {
    const [user, setUser] = useState()
    const [loading,setLoading] = useState(true)
    const { productDetails } = useContext(PostContext)

    const userId = productDetails?.userId
    const db = getFirestore();
    const collectionName = 'users';
    useEffect(() => {
        const getFilteredDocuments = async () => {
            try {
                const q = query(collection(db, collectionName), where('uid', '==', userId));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    setLoading(false)
                    setUser(documentData)
                });
            } catch (error) {
                console.error('Error getting filtered documents:', error);
            }
        };
        getFilteredDocuments();
    }, [userId])
    console.log(user)

    return (
        <div>
            {loading ? 
            <div>
                <h1>loading...</h1>
            </div>
            :
            (<div className="viewParentDiv">
                <div className="imageShowDiv">
                    <img
                        src={productDetails.image}
                        alt=""
                    />
                </div>
                <div className="rightSection">
                    <div className="productDetails">
                        <p>&#x20B9; {productDetails.price} </p>
                        <span>{productDetails.name}</span>
                        <p>{productDetails.category}</p>
                        <span>{productDetails.date}</span>
                    </div>
                    <div className="contactDetails">
                        <p>Seller details</p>
                        <p>{user ? user.displayName : ''}</p>
                        <p>{user ? user.phone : ''}</p>
                    </div>
                </div>
            </div>)}
        </div>
    );
}
export default View;
