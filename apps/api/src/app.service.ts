import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getTrafficImages(date_time: string): Promise<any> {
    const url = `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${date_time}`;

    try {
      // to solve ssl certificate issue
      const agent = new https.Agent({ rejectUnauthorized: false });
      const config: AxiosRequestConfig = { httpsAgent: agent };
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve traffic images');
    }
  }
}
