import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css'
 
function App() {
 const [postsPerPage] = useState(10);
 const [offset, setOffset] = useState(1);
 const [posts, setAllPosts] = useState([]);
 const [pageCount, setPageCount] = useState(0)
 
 const getPostData  =   (data)  => {
   console.log(data);
   return (
     data.map(post => <div className="container" key={post.id}>
       <p>Coin Name: {post.id}</p>
       <p>Coin Image: <img className="image" height="40"src={post.logo} alt="" /></p>
     </div>)
   )
 
 }

const getLogo = (coinid) => {
  console.log(coinid.toString());
  const res =  axios.get(`https://api.coingecko.com/api/v3/coins/${coinid}/tickers?include_exchange_logo=true`)
  return res
}
 
 const getAllPosts = async () => {
   console.log("testing")
   const res = await axios.get(`https://api.coingecko.com/api/v3/coins/list`)
   console.log(res);
   const data = res.data;
   let logoData= []
   const slice = data.slice(offset - 1 , offset - 1 + postsPerPage)
   for(var i = 0; i < slice.length; i++){
      await getLogo(slice[i].id).then(res => logoData.push(res.data))
   }

    for(var i = 0; i < slice.length; i++){
      slice[i].logo = logoData[i].tickers[0].market.logo
   }


   console.log(slice);

   // For displaying Data
   const postData =  getPostData(slice)
   // Using Hooks to set value
   setAllPosts(postData)
   setPageCount(Math.ceil(data.length / postsPerPage))
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
 };
 
 useEffect(() => {
   getAllPosts()
 }, [offset])
 
 return (
   <div className="main-app">
    
     {posts}

     <ReactPaginate
       previousLabel={"previous"}
       nextLabel={"next"}
       breakLabel={"..."}
       breakClassName={"break-me"}
       pageCount={pageCount}
       onPageChange={handlePageClick}
       containerClassName={"pagination"}
       subContainerClassName={"pages pagination"}
       activeClassName={"active"} />
   </div>
 );
}
 
export default App;