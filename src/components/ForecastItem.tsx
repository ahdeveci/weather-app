import React from "react";
import {Card, Col} from "antd";
import {getDayName} from "../utils/Misc";

interface ForecastItemProps {
    forecast: any;
}

const ForecastItem = ({forecast}: ForecastItemProps): JSX.Element => {
    return (
        <Col lg={3} md={6} xs={12} className="forecasts">

            <Card bordered={false}>
                <div className="temperature">
                    <div>
                        <div className="day-name">
                            {getDayName(forecast.date, 'short')}
                        </div>
                        <div className="temp">{forecast.day.avgtemp_c}&nbsp;
                            <span>
                                <sup>o</sup>C
                            </span>
                        </div>
                    </div>
                    <div>
                        <img src={forecast.day.condition.icon} alt="weather icon" width={70}/>
                        <div>
                            {forecast.day.condition.text}
                        </div>
                    </div>

                </div>

            </Card>

        </Col>
    );
};

export default ForecastItem;
