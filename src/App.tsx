import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {IPService} from "./services/IPService";
import {WeatherService} from "./services/WeatherService";

type Position = {
    latitude: number;
    longitude: number;
};

const App = (): JSX.Element => {
    const [position, setPosition] = useState<Position | null>(null);
    const [visible, setVisible] = useState<string>(document.visibilityState);
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            const {latitude, longitude} = position.coords;
            setPosition({latitude, longitude});
        }, async (error: GeolocationPositionError) => {
            getIPData();
        });
        document.addEventListener("visibilitychange", () => {
            setVisible(document.visibilityState);
        });
    }, []);

    const getWeatherData = async () => {

        WeatherService.getWeather(`${position?.latitude},${position?.longitude}`, 'current').then((result: any) => {
            // console.log(result);
            setWeather(result.data);
        }).catch((error: any) => {
            console.log(error);
        });
    };

    const getIPData = async () => {
        const ipData = await IPService.getIP();
        const {lat: latitude, lon: longitude} = ipData.data;
        setPosition({latitude, longitude});
    };

    useEffect(() => {
        if (position) {
            getWeatherData();
        }
    }, [position]);

    // TODO: Implement layout
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
