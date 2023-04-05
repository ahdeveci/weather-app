import React, {useCallback, useEffect, useState} from 'react';
import {
    Col,
    Row,
    Alert
} from 'antd';

import './assets/css/App.scss';
import {IPService} from './services/IPService';
import {WeatherService} from './services/WeatherService';
import CurrentSummary from "./components/CurrentSummary";
import ForecastItem from "./components/ForecastItem";

type Position = {
    latitude: number;
    longitude: number;
};

const App = (): JSX.Element => {
    const [position, setPosition] = useState<Position | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [forecasts, setForecasts] = useState<any[]>([]);
    const [location, setLocation] = useState<any>(null);
    const [permission, setPermission] = useState<boolean>(true);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(undefined);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            console.log(position);
            setPermission(true);
            const {latitude, longitude} = position.coords;
            setPosition({latitude, longitude});
        }, async (error: GeolocationPositionError) => {
            setPermission(false);
            getIPData();
        });


        return () => clearInterval(intervalId);
    }, []);

    const startInterval = () => {
        const id = setInterval(() => {
            if (!document.hidden) {
                getWeatherData();
            }
        }, 5000);
        setIntervalId(id);
    }

    const getWeatherData = async () => {
        if (position) {
            const result = await WeatherService.getWeather(`${position?.latitude},${position?.longitude}`, 'current');
            if (result?.data) {
                const {location, current} = result.data;
                setWeather(current);
                setLocation(location);
            }
        }
    };

    const getForecastData = useCallback(async () => {
        if (position) {
            const result = await WeatherService.getWeather(`${position?.latitude},${position?.longitude}`, 'forecast', '&days=7')
            if (result?.data) {
                return result.data;
            }
        }
        return null;
    }, [position]);


    const getIPData = async () => {
        const ipData = await IPService.getIP();
        const {lat: latitude, lon: longitude} = ipData.data;
        setPosition({latitude, longitude});
    };

    useEffect(() => {
        getForecastData().then((data: any) => {
            if (data) {
                const {location, current, forecast} = data;
                setLocation(location);
                setWeather(current);
                setForecasts(forecast?.forecastday);
            }
        });
    }, [getForecastData]);

    useEffect(() => {
        if (position && !intervalId) {
            startInterval();
        }
    }, [position]);


    return (
        <div className="App">
            {
                !permission &&
                <Row justify="center" style={{paddingTop: '10px'}}>
                    <Col lg={12} xs={23}>
                        <Alert style={{position: "absolute", top: "10px"}} message="You did not grant location permission!" type="error" />
                    </Col>
                </Row>
            }

            <Row className="main" justify="space-around">
                <Col lg={12} xs={23}>
                    <CurrentSummary weather={weather} location={location}/>
                </Col>
            </Row>
            <Row className="main" justify="center">
                {
                    forecasts.map((forecast: any, index: number) => {
                        return (
                            <ForecastItem key={index} forecast={forecast}/>
                        );
                    })
                }
            </Row>
        </div>
    );
}

export default App;
