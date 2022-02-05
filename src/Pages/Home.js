import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';


const Home = () => {
const [exchangePerPage] = useState(10);
 const [offset, setOffset] = useState(1);
 const [exchangeData, setExchangeData] = useState([]);
 const [pageCount, setPageCount] = useState(0)
 
 // this function renders exchange info such as, exchange name, exchange logo, and exchange url 
 const renderExchangeInfo  =  (exchanges)  => {
   console.log(exchanges);
   return (
     exchanges.map(exchange => <div onClick={() => {
       // store info that gets loaded on the seperate page 
         localStorage.setItem('exchangeName', exchange.name)
         localStorage.setItem('exchangeLogo', exchange.image)
         localStorage.setItem('exchangeUrl', exchange.url)
         localStorage.setItem('exchangeCountry', exchange.country)
         localStorage.setItem('exchangeTrustScore', exchange.trust_score_rank)
         localStorage.setItem('exchangeYear', exchange.year_established)
         localStorage.setItem('exchangeDescription', exchange.description)
         localStorage.setItem('exchangeMediaFacebook', exchange.mediaLinks.facebook_url)
          localStorage.setItem('exchangeMediaReddit', exchange.mediaLinks.reddit_url)
          localStorage.setItem('exchangeMediaTelegram', exchange.mediaLinks.telegram_url)
          localStorage.setItem('exchangeMediaSlack', exchange.mediaLinks.slack_url)
         window.location.href="/exchangeInfo"
     }} className="container" key={exchange.id}>
       <p>Exchange Name: {exchange.name}</p>
       <p>Exchange Image: <img className="image" height="40"src={exchange.image} alt="" /></p>
       <p>Exchange URL: <a  target="_blank" href={exchange.url}>Trade url</a></p>
      <p>Trust Score Rank: {exchange.trust_score_rank}</p>
      <p>Country: {exchange.country}</p>
     </div>)
   )
 
 }
// this function gets the social Media links of the exchange 
const getSocialMediaLinks = (exchangeid) => {
    const res =  axios.get(`https://api.coingecko.com/api/v3/exchanges/${exchangeid}`)
    return res
}
 
// this needs to be done first because other api calls will rely on the exchange id 
 const getExchangeInfo = async () => {
   const res = await axios.get(`https://api.coingecko.com/api/v3/exchanges`)
   const data = res.data;
   let socialMediaData = []
   let countryData = []
   const slice = data.slice(offset - 1 , offset - 1 + exchangePerPage)
     for(var i = 0; i < slice.length; i++){
      await getSocialMediaLinks(slice[i].id).then(res => {
        let socialMediaObj = {}
        socialMediaObj.facebook_url = res.data.facebook_url
        socialMediaObj.reddit_url = res.data.reddit_url
        socialMediaObj.telegram_url = res.data.telegram_url
        socialMediaObj.slack_url = res.data.slack_url
        socialMediaData.push(socialMediaObj)
      })
   }

   for(var i = 0; i < slice.length; i++){
     slice[i].mediaLinks = socialMediaData[i]
   }


   const postData =  renderExchangeInfo(slice)

   setExchangeData(postData)
   setPageCount(Math.ceil(data.length / exchangePerPage))
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
 };
 
 useEffect(() => {
   getExchangeInfo()
 }, [offset])
    return (
    <div className="main-app">
      <p style={{fontSize: 40}} className="title">Main Page</p>
      
     {exchangeData}
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
