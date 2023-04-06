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
import SearchForm from "./components/SearchForm";

const TIMER_INTERVAL = 5000;
type Position = {
    latitude: number;
    longitude: number;
};

const App = (): JSX.Element => {
    const [position, setPosition] = useState<Position | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [searchedWeather, setSearchedWeather] = useState<any>(null);
    const [searchedLocation, setSearchedLocation] = useState<any>(null);
    const [searchedDate, setSearchedDate] = useState<any>(null);
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
        }, TIMER_INTERVAL);
        setIntervalId(id);
    }

    const getWeatherData = async () => {
        if (position) {
            const q = `${position?.latitude},${position?.longitude}`;
            const result = await WeatherService.getWeather(q, 'current');
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

    const getWeatherDataByPlace = async (place: string, date: string) => {
        const reqType = date === '' ? 'current' : new Date(date) > new Date() ? 'future' : 'history';
        const dt = date === '' ? '' : `&dt=${date}`;
        const result = await WeatherService.getWeather(place, reqType, dt);
        if (result?.data) {
            const {location, forecast, current} = result.data;
            setSearchedLocation(location);
            setSearchedWeather(current || forecast?.forecastday[0]?.day);
            setSearchedDate(current ? location.localtime : date);
        }
    }


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

    const handleSubmit = useCallback((formValues: {place: string, date: string}) => {
        getWeatherDataByPlace(formValues.place, formValues.date);
    }, []);


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
                    <h1>
                        Right now in {location?.name}, it's {weather?.condition?.text}
                    </h1>
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
            <Row className="main" justify="center">
                <Col lg={12} xs={23}>
                    <SearchForm onSubmit={handleSubmit}/>
                </Col>
            </Row>
            {
                searchedWeather && searchedLocation &&
                <Row className="main" justify="space-around">
                    <Col lg={12} xs={23}>
                        <h1>
                            In {searchedLocation.name} {searchedWeather.condition?.text !== '' && <span>it's {searchedWeather.condition?.text}</span>} on {new Date(searchedDate).toLocaleDateString()}
                        </h1>
                        <CurrentSummary weather={searchedWeather} location={searchedLocation}/>
                    </Col>
                </Row>
            }

        </div>
    );
}

export default App;
