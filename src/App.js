
import './App.css'
import {BrowswerRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import ExchangeInfo from './Pages/ExchangeInfo';
 
function App() {

 return (
  <div>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/exchangeInfo" element={<ExchangeInfo/>}/>
    </Routes>

  </div>
 );
}
 
export default App;