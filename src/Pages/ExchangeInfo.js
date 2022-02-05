import React from 'react'
import { useState, useEffect } from 'react'
import '../ExchangePage.css'


const ExchangeInfo = () => {
    const [exchangeName,setExchangeName] = useState(null)
    const [logo,setLogo] = useState(null)
    const [country,setCountry] = useState(null)
    const [trust_score,setTrustScore] = useState(null)
    const [yearEstablished,setYearEstablished] = useState(null)
    const [description,setDescription] = useState(null)
    const [facebook,setFaceBook] = useState(null)
    const [reddit,setReddit] = useState(null)
    const [telegram ,setTelegram] = useState(null)
    const [slack ,setSlack] = useState(null)

    useEffect(() => {
        // grabs info that was sent by the Home page
        setExchangeName(localStorage.getItem('exchangeName'))
        setLogo(localStorage.getItem('exchangeLogo'))
        setCountry(localStorage.getItem('exchangeCountry'))
        setTrustScore(localStorage.getItem('exchangeTrustScore'))
        setYearEstablished(localStorage.getItem('exchangeYear'))
        setDescription(localStorage.getItem('exchangeDescription'))
        setFaceBook(localStorage.getItem('exchangeMediaFacebook'))
        setReddit(localStorage.getItem('exchangeMediaReddit'))
        setTelegram(localStorage.getItem('exchangeMediaTelegram'))
        setSlack(localStorage.getItem('exchangeMediaSlack'))
    }, []);

    
    return (
        <div className="main-app">
             <button className="btn btn1" onClick={() => {
           localStorage.clear()
           window.location.href="/"
        }}>Go back to main page</button>
        <div className="container2">
       <p>Exchange Name: {exchangeName}</p>
         <p>Country: {country }</p>
         <p>Trust Score Rank:  {trust_score} </p>      
        <p>Exchange Logo: <img className="image" height="40"src={logo} alt="" /></p>
        <p>Year Established:  {yearEstablished} </p>   
        <p>Facebook: <a href={facebook}>{facebook ? "Facebook" : ""} </a></p>   
        <p>Reddit:  <a href={reddit}>{reddit ? "Reddit" : ""} </a></p>   
        <p>Telegram: <a href={telegram}>{telegram ? "Telegram" : ""} </a> </p>   
        <p>Slack: <a href={slack}>{slack ? "Slack" : ""} </a> </p>   
         <p>Description:  {description ? description : "None"} </p>   
     </div>
        </div>
    )
}

export default ExchangeInfo
