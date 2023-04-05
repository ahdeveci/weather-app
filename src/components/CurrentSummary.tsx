import React from 'react';
import {Card, Col, Divider, Progress, Row} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';

import {getDayName} from "../utils/Misc";

interface CurrentSummaryProps {
    weather: any;
    location: any;
}

const CurrentSummary = ({weather, location}: CurrentSummaryProps) => {
    return (
        <>
            <h1>
                Right now in {location?.name}, it's {weather?.condition?.text}
            </h1>
            <Row justify="space-between" gutter={[16, 16]}>
                <Col lg={11} xs={24}>
                    <Card bordered={false}>
                        <div className="temperature">
                            <div>
                                <div className="day-name">
                                    {getDayName(location?.localtime)}
                                </div>
                                <div className="temp">{weather?.temp_c}&nbsp;
                                    <span>
                                        <sup>o</sup>C
                                    </span>
                                </div>
                            </div>
                            <div>
                                <img src={weather?.condition?.icon} alt="weather icon" width={70}/>
                                <div>
                                    {weather?.condition?.text}
                                </div>
                            </div>

                        </div>

                    </Card>
                </Col>
                <Col lg={12} xs={24}>
                    <Card bordered={false} className="temperature">
                        <div className="detail-wrapper">
                            <div className="humidity">
                                <Progress type="dashboard" percent={weather?.humidity}
                                          strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}/>
                                <div className="label">Humidity</div>
                            </div>
                            <div className="list">
                                <div className="item">
                                    <div className="label">
                                        Wind
                                    </div>
                                    <div>
                                        <ArrowRightOutlined style={{rotate: `${weather?.wind_degree}deg`}}/>
                                        <span className="speed">
                                                    {weather?.wind_kph} km/h
                                                </span>
                                    </div>
                                </div>
                                <Divider className="divider"/>
                                <div className="item">
                                    <div className="label">
                                        Wind Gusts
                                    </div>
                                    <div className="speed">
                                        {weather?.gust_kph} km/h
                                    </div>
                                </div>
                                <Divider className="divider"/>
                                <div className="item">
                                    <div className="label">
                                        Pressure
                                    </div>
                                    <div className="speed">
                                        {weather?.pressure_in} mb
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
};

export default CurrentSummary;
