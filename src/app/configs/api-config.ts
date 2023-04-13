export class ApiConfig {
  apiUrl = "http://13.64.196.20:8080";
}
export interface IResponseSchema {
  message?: string;
  error?: string;
  data?: any;
  status?: string;
}
