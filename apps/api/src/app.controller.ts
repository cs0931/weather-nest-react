import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/getTrafficImages')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTrafficImages(
    @Query('date_time') date_time: string,
  ): Promise<any[]> {
    try {
      const trafficImages = await this.appService.getTrafficImages(date_time);
      return trafficImages;
    } catch (error) {
      throw new Error('Failed to retrieve traffic images');
    }
  }
}
