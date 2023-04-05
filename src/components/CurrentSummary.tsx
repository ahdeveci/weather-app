import React from 'react';
import {Card, Col, Divider, Progress, Row} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';

import {getDayName} from "../utils/Misc";

interface CurrentSummaryProps {
    weather: any;
};

const CurrentSummary = ({weather}: CurrentSummaryProps) => {
    return (
        <>
            <h1>
                Right now in {weather?.location?.name}, it's {weather?.current?.condition?.text}
            </h1>
            <Row justify="space-between" gutter={[16, 16]}>
                <Col lg={11} xs={24}>
                    <Card bordered={false}>
                        <div className="temperature">
                            <div>
                                <div className="day-name">
                                    {getDayName(weather?.location?.localtime)}
                                </div>
                                <div className="temp">{weather?.current?.temp_c}&nbsp;
                                    <sup>o</sup>C
                                </div>
                            </div>
                            <div>
                                <img src={weather?.current?.condition?.icon} alt="weather icon" width={70}/>
                                <div>
                                    {weather?.current?.condition?.text}
                                </div>
                            </div>

                        </div>

                    </Card>
                </Col>
                <Col lg={12} xs={24}>
                    <Card bordered={false} className="temperature">
                        <div className="detail-wrapper">
                            <div className="humidity">
                                <Progress type="dashboard" percent={weather?.current?.humidity}
                                          strokeColor={{'0%': '#108ee9', '100%': '#87d068'}}/>
                                <div className="label">Humidity</div>
                            </div>
                            <div className="list">
                                <div className="item">
                                    <div className="label">
                                        Wind
                                    </div>
                                    <div>
                                        <ArrowRightOutlined style={{rotate: `${weather?.current?.wind_degree}deg`}}/>
                                        <span className="speed">
                                                    {weather?.current?.wind_kph} km/h
                                                </span>
                                    </div>
                                </div>
                                <Divider className="divider"/>
                                <div className="item">
                                    <div className="label">
                                        Wind Gusts
                                    </div>
                                    <div className="speed">
                                        {weather?.current?.gust_kph} km/h
                                    </div>
                                </div>
                                <Divider className="divider"/>
                                <div className="item">
                                    <div className="label">
                                        Pressure
                                    </div>
                                    <div className="speed">
                                        {weather?.current?.pressure_in} mb
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
