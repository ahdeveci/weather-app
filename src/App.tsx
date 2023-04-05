import React, {useEffect, useState} from 'react';
import {
    Col,
    Row,
} from 'antd';

import './assets/css/App.scss';
import {IPService} from './services/IPService';
import {WeatherService} from './services/WeatherService';
import CurrentSummary from "./components/CurrentSummary";

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
            <Row className="main" justify="space-around">
                <Col lg={12} xs={23}>
                    <CurrentSummary weather={weather}/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
