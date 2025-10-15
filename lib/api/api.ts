import axios, { AxiosInstance, AxiosResponse } from "axios";


export const nextServer: AxiosInstance = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});




export class ApiError<T = unknown> extends Error {
  public status?: number;
  public data?: T;
  public response?: AxiosResponse<T>;

  constructor(message: string, response?: AxiosResponse<T>) {
    super(message);
    this.name = "ApiError";
    this.response = response;
    this.status = response?.status;
    this.data = response?.data;
  }
}


