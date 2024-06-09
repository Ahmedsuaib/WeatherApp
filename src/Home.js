import React, { useState } from 'react';
import './style.css';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: '/images/clouds.png'
  });
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleclick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4ec9c6dceeee4383b0284c848d7c71e6&units=metric`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(res => {
          let imagepath = '';
          if (res.weather[0].main === "Clouds") {
            imagepath = "/images/clouds.png";
          } else if (res.weather[0].main === "Clear") {
            imagepath = "/images/Clear.png";
          } else if (res.weather[0].main === "Rain") {
            imagepath = "/images/Rain.png";
          } else if (res.weather[0].main === "Drizzle") {
            imagepath = "/images/Drizzle.png";
          } else if (res.weather[0].main === "Mist") {
            imagepath = "/images/Mist.png";
          } else {
            imagepath = '/images/clouds.png';
          }

          console.log(res);
          setData({
            ...data,
            celcius: res.main.temp,
            name: res.name,
            humidity: res.main.humidity,
            speed: res.wind.speed,
            image: imagepath
          });
        })
        .catch(err => {
          if (err.message.includes('404')) {
            setError("Invalid City Name");
          } else {
            setError('');
          }
          console.log(err);
        });
    }
  };

  return (
    <div className='container'>
      <div className='weather'>
        <div className="search">
          <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
          <button onClick={handleclick}>
            <img src="/images/search.png" alt="" />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className='icon' />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="" />
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.png" alt="" />
              <div className='wind'>
                <p>{Math.round(data.speed)} km/h</p>
                <p>wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
