import { config } from '@/config';
import axios from 'axios';
import { sign } from 'jsonwebtoken';

export class AxiosService {
  public axios: ReturnType<typeof axios.create>;

  constructor(baseUrl: string, serviceName: string) {
    this.axios = this.axiosCreateInstant(baseUrl, serviceName);
  }

  public axiosCreateInstant(baseURL: string, serviceName?: string): ReturnType<typeof axios.create> {
    let requestGatewayToken = '';
    if (serviceName) {
      requestGatewayToken = sign({ id: serviceName }, config.GATEWAY_JWT_TOKEN);
    }

    const instance: ReturnType<typeof axios.create> = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        gatewayToken: requestGatewayToken
      },
      withCredentials: true
    });

    return instance;
  }
}