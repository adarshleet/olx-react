import React, { useState, useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../store/postContext';

function Posts() {
    const [products, setProducts] = useState([])

    const db = getFirestore()
    const myCollection = collection(db, 'products');

    const {setProductDetails} = useContext(PostContext)

    const navigate = useNavigate()

    useEffect(() => {
        const getDocuments = async () => {
            try {
                const querySnapshot = await getDocs(myCollection);

                const dataArray = [];
                querySnapshot.forEach((doc) => {
                    dataArray.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setProducts(dataArray)
                console.log(dataArray)
            } catch (error) {
                console.error('Error getting documents: ', error);
            }
        };
        getDocuments();
    }, [myCollection])

    const setProduct = (product) => {
        setProductDetails(product);
        navigate('/view');
    };
    

    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards">
                    {products.map((product) => (
                        <div className="card" id={product.id} onClick={()=>setProduct(product)}>
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src={product.image} alt="" />
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; {product.price}</p>
                            <span className="kilometer">{product.category}</span>
                            <p className="name">{product.name}</p>
                        </div>
                        <div className="date">
                            <span>{product.date}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt="" />
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
