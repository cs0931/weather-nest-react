import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/getTrafficImages')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTrafficImages(
    @Query('date_time') date_time: string,
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<any[]> {
    try {
      const trafficImages = await this.appService.getTrafficImages(date_time);

      const actionItems = trafficImages.items[0].cameras;
      // first check if there is an exact match for the latitude and longitude
      const matchedImages = actionItems.filter(
        (item) =>
          item.location.latitude === latitude &&
          item.location.longitude === longitude,
      );
      if (matchedImages.length > 0) {
        const imageURL = matchedImages.map((item) => item.image);
        return imageURL;
      }
      // find the nearest location based on latitude and longitude
      else {
        const distances = actionItems.map((item) => {
          const latDiff = item.location.latitude - parseFloat(latitude);
          const lonDiff = item.location.longitude - parseFloat(longitude);
          const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
          return { item, distance };
        });

        const sortedDistances = distances.sort(
          (a, b) => a.distance - b.distance,
        );
        const nearestItem = sortedDistances[0].item;
        return nearestItem.image;
      }
      // return trafficImages;
    } catch (error) {
      throw new Error('Failed to retrieve traffic images');
    }
  }
}
