import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const App = (): JSX.Element => {
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [visible, setVisible] = useState<string>(document.visibilityState);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            setPosition(position);
        }, (error: GeolocationPositionError) => {
            console.log(error);
        });
        document.addEventListener("visibilitychange", () => {
            setVisible(document.visibilityState);
        });
    }, []);

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
