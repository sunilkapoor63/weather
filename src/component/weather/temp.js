// https://api.openweathermap.org/data/2.5/weather?q=varanasi&appid=40855a63b67b8f210ababa33dd6817d4 

import React, { useEffect, useState } from 'react'
import Weathercard from './weathercard';
import "./style.css"
const Temp = () => {
    const [searchValue, setsearchValue] = useState("Varanasi");
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async () =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
            &units=metric&appid=40855a63b67b8f210ababa33dd6817d4`;

            const res = await fetch(url);
            const data = await res.json();
            const {temp,humidity,pressure} =data.main;
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherinfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }
            setTempInfo(myNewWeatherinfo);

        } catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        getWeatherInfo();
    }, []);
  return (
    <>
    <div className='wrap'>
        <div className='search'> 
        <input type="search"
        placeholder='search'
        autoFocus
        id='search'
        className='searchTerm'
        value={searchValue}
        onChange={ (e) => setsearchValue(e.target.value)}
        />
        <button className='searchButton' type='button'
        onClick={getWeatherInfo}>
            Search
        </button>
        </div>
    </div>
    {/* our temp card  */}
    <Weathercard tempInfo={tempInfo} />
    </>
  )
}

export default Temp