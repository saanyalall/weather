import React, { useState } from 'react'
import './style.css'
import axios from 'axios';

function Home() {

  const [data,setData]=useState({
    celcius:10,
    name:'London',
    humidity:10,
    speed:2,
    image:'/Images/partly-cloudy.png'
  })

  const[name,setName]=useState('');


  const handleClick = ()=>{
    if(name!==""){
      const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`;
    axios.get(apiUrl)
    .then(res=> {
      // console.log(res.data)
      let imagePath = '';
      
      if(res.data.weather[0].main =='partly-cloudy'){
        imagePath="/Images/partly-cloudy.png"
      }
      else if(res.data.weather[0].main =='Storm'){
        imagePath='/Images/storm.png'
      }
      else if(res.data.weather[0].main =='Drizzle'){
        imagePath='/Images/drizzle.png'
      }
      else if(res.data.weather[0].main =='Clear-sky'){
        imagePath='/Images/clear-sky.png'
      }
       else{
        imagePath="/Images/partly-cloudy.png"
      }
      setData({...data, celcius:res.data.main.temp, name:res.data.name , humidity:res.data.main.humidity ,
         speed:res.data.wind.speed , image:imagePath})
    })
    .catch(err=>console.log(err));
    }
  }
  return (
    <div className='container'>Weather App
      <div className='weather'>
        <div className='search'>
          <input type='text' placeholder='name a city' onChange={e=>setName(e.target.value)}/>
          <button><img src='/Images/icons8-search.gif' onClick={handleClick} alt=''></img></button>
        </div>
       <div className='winfo'>
        <img src={data.image}></img>
        <h1>{Math.round(data.celcius)}°C</h1>
        <h2>{data.name}</h2>
       </div>

       <div className='details'>
        <div className='col'>
          <img src='/images/humidity.png'/>
          <div className='humidity'>
            <p>{Math.round(data.humidity)}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className='col '>
          <img src='/images/windy.png'/>
          <div className='wind'>
            <p>{Math.round(data.speed)}km/h</p>
            <p>wind</p>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default Home