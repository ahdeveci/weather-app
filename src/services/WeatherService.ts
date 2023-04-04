import HttpUtil from "../utils/HttpUtil";

export class WeatherService {
    static async getWeather(query: string, type: string, miscParams:string = ''): Promise<any> {
        const request = {
            method: 'GET',
            url: `${process.env.REACT_APP_WEATHER_API_URL}/${type}.json?q=${query}&key=${process.env.REACT_APP_WEATHER_API_KEY}&aqi=no&alerts=no${miscParams}`
        };
        const result: any = await HttpUtil.makeRequest(request);
        return result;
    }
}