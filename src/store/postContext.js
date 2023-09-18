import {createContext,useState} from 'react'

export const PostContext = createContext(null)

function Post({children}){
    const [productDetails,setProductDetails] = useState()

    return(
        <PostContext.Provider value={{productDetails,setProductDetails}}>
            {children}
        </PostContext.Provider>
    )
}

export default Post