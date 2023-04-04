import HttpUtil from "../utils/HttpUtil";

export class IPService {

    static async getIP(): Promise<any> {
        const request = {
        method: 'GET',
        url: `${process.env.REACT_APP_IP_API_URL}`
        };

        const result: any = await HttpUtil.makeRequest(request);
        return result;
    }
}