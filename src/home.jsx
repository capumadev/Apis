import React, { useState } from "react";
import './styles.css';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'Quito',
        humidity: 20,
        speed: 2,
        image: 'src/images/clear.png'
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=66cb6023fc14e797720e6bda7e41ce08&units=metric`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ciudad Invalida');
                    }
                    return response.json();
                })
                .then(res => {
                    let imagePath = '';
                    switch (res.weather[0].main) {
                        case "Clear":
                            imagePath = "src/images/clear.png";
                            break;
                        case "Mist":
                            imagePath = "src/images/mist.png";
                            break;
                        case "Rain":
                            imagePath = "src/images/rain.png";
                            break;
                        case "Clouds":
                            imagePath = "src/images/cloud.png";
                            break;
                        case "Snow":
                            imagePath = "src/images/snow.png";
                            break;
                        default:
                            imagePath = "src/images/clear.png";
                    }

                    setData({
                        celcius: res.main.temp,
                        name: res.name,
                        humidity: res.main.humidity,
                        speed: res.wind.speed,
                        image: imagePath
                    });
                    setError('');
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    };

    return (
        <div className='container'>
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder='Ingrese la ciudad' onChange={e => setName(e.target.value)} />
                    <button onClick={handleClick}><img src="/src/images/busqueda-de-lupa.png" alt="" /></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="src/images/rain.png" alt="" />
                            <div className="sunny">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humedad</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="src/images/mist.png" alt="" />
                            <div className="winds">
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Vientos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
