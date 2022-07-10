import axios from "axios";

let fonciaNetworkIp: string = "172.25.103.70";
let prodUrl: string = "https://dramane.dev/automationid/api/";
// let fonciaNetworkIp: string = "172.20.10.2";
//192.168.1.87
export const axiosInstance = axios.create({
    baseURL: prodUrl,
});
// export const axiosInstance = axios.create({
//     baseURL: `http://${fonciaNetworkIp}:3030/api/`,
// });
