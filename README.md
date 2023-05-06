# weather-nest-react

Initial monitor view
![Initial View(monitor)](https://user-images.githubusercontent.com/4726719/236624498-de60895c-1efa-4a76-a05b-3a6844fbcad2.png)

Initial mobile view
![Initial View(mobile)](https://user-images.githubusercontent.com/4726719/236624560-1ec9f7d8-90e9-4e61-a2ec-4775a21b86fe.png)


Monitor view(weather and traffic)
![Monior View](https://user-images.githubusercontent.com/4726719/236624628-3f9fa31c-730b-4c30-8974-d2fc5645e5f9.png)

Mobile view((weather and traffic))
![Mobile View](https://user-images.githubusercontent.com/4726719/236624675-bd1e325a-5bdd-49b8-b1a1-9bf665b7ad03.png)




# Getting Started 

Clone https://github.com/cs0931/weather-nest-react.git

Install dependencies by 'npm i' in the following paths
1) cd weather-nest-react
2) cd weather-nest-react/apps/client
3) cd weather-nest-react/apps/api

Turbo is used to run the react and nest servers together

Script to use -> npm run dev

App runs in http://localhost:5173

Apis used are 
1) TrafficImages(https://data.gov.sg/dataset/traffic-images)
2) WeatherForecast(https://data.gov.sg/dataset/weather-forecast)

# Assumptions made

1) The weather-forecast api used is to forecast weather for the next 2 hours and can only provide data for the next 2 days.
2) Based on the date and time fields data, the weather forecast api 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast' is called 
   directly from react client to get the location names, latitudes, longitudes and weather data.
3) Based on selected location, react client calls nest api end point 'http://localhost:5173/api/getTrafficImages?latitude=1.38&longitude=103.805&date_time=2023-05-02T02%3A04%3A26'
   were the server uses a httpclient to call 'https://api.data.gov.sg/v1/transport/traffic-images?date_time=2023-05-06T14%3A34%3A23'.
4) The latitude and longitude passed to the nest api end point is to find the exact or nearest latitude and longitude from the 
   list of data from  'https://api.data.gov.sg/v1/transport/traffic-images?date_time=2023-05-06T14%3A34%3A23' and return only the image url.
5) The react client receives only the image url from the getTrafficImages api call.


   
