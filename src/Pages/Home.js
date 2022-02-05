import React from 'react'
import { useState, useEffect } from 'react'
import {BrowswerRouter as Router, Routes, Route} from "react-router-dom"
import axios from 'axios'
import ReactPaginate from 'react-paginate';

const Home = () => {
     const [coinsPerPage] = useState(10);
 const [offset, setOffset] = useState(1);
 const [coinData, setCoinData] = useState([]);
 const [pageCount, setPageCount] = useState(0)
 
 // this function renders exchange info such as, coin name, coin logo, and coin url 
 const renderExchangeInfo  =  (coins)  => {
   console.log(coins[0].trust_score);
   return (
     coins.map(coin => <div onClick={() => {

     }} className="container" key={coin.id}>
       <p>Coin Name: {coin.id}</p>
       <p>Coin Image: <img className="image" height="40"src={coin.logo} alt="" /></p>
       <p>Coin URL: <a  target="_blank" href={coin.url}>Trade url</a></p>
      <p>Trust Score: {coin.trust_score ? coin.trust_score: "DNS"}</p>
     </div>)
   )
 
 }
// this function gets the logo of the exchange 
const getLogo = (coinid) => {
  console.log(coinid.toString());
  const res =  axios.get(`https://api.coingecko.com/api/v3/coins/${coinid}/tickers?include_exchange_logo=true`)
  return res
}
 
// this needs to be done first because other api calls will rely on the coin id 
 const getCoinExchangeInfo = async () => {
   const res = await axios.get(`https://api.coingecko.com/api/v3/coins/list`)
   const data = res.data;
   let logoData= []
   const slice = data.slice(offset - 1 , offset - 1 + coinsPerPage)
   for(var i = 0; i < slice.length; i++){
      await getLogo(slice[i].id).then(res => {
        console.log(res.data);
        logoData.push(res.data)
      })
   }

    for(var i = 0; i < slice.length; i++){
      console.log(logoData[i].tickers[0].trust_score)
      slice[i].logo = logoData[i].tickers[0].market.logo
      slice[i].url = logoData[i].tickers[0].trade_url
      slice[i].trust_score= logoData[i].tickers[0].trust_score
   }


   const postData =  renderExchangeInfo(slice)

   setCoinData(postData)
   setPageCount(Math.ceil(data.length / coinsPerPage))
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
 };
 
 useEffect(() => {
   getCoinExchangeInfo()
 }, [offset])
    return (
         <div className="main-app">
    
     {coinData}
      {/* <Route path="/" element={this}></Route> */}
     {/* <Route path="/coinInfo" element={<CoinInfo/>}></Route> */}

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
    )
}

export default Home
