import {useEffect, useState} from 'react'
import 'axios'
import axios from 'axios'


function App() {

  const [data, setData] = useState([])

const fetchData = () => {
  axios.get('https://api.coingecko.com/api/v3/coins/list').then(response => {
    setData(response.data)
    console.log(response.data)
  })
}

useEffect( () => {
  fetchData()
},[]
)

const coinData = data.map(coin => {
  return (<div>{coin.id}</div>)
})

  return (
    <div className="App">
        <div>{coinData}</div>
    </div>
  );
}

export default App;
