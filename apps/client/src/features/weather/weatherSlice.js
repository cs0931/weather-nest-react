import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const weatherURL = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?'
const trafficURL = 'https://api.data.gov.sg/v1/transport/traffic-images?'

export const getLocations = createAsyncThunk('weather/getLocations', async (dateTime) => {
  return fetch(
    weatherURL +
      new URLSearchParams({
        date_time: dateTime,
      })
  )
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
})

export const getTrafficImages = createAsyncThunk('weather/getTrafficImages', async (dateTime) => {
  return fetch(
    trafficURL +
      new URLSearchParams({
        date_time: dateTime,
      })
  )
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
})

const initialState = {
  date: '',
  time: '',
  location: '',
  locations: [],
  displayText: 'WEATHER',
  weatherValue: '',
  trafficImageUrl: '',
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload
    },
    setTime: (state, action) => {
      state.time = action.payload
    },
    setNormal: (state, action) => {
      state.weatherValue = action.payload
    },
    setLocation: (state, action) => {
      state.location = action.payload
    },
  },
  extraReducers: {
    [getLocations.pending]: (state) => {
      console.log(state)
    },
    [getLocations.fulfilled]: (state, action) => {
      const areaMetadata = action.payload.area_metadata
      const forecastItem = action.payload.items[0]

      const locationNames = forecastItem.forecasts.map((forecast) => {
        const areaData = areaMetadata.find((area) => area.name === forecast.area)
        return {
          name: forecast.area,
          label_location: areaData.label_location,
          forecast: forecast.forecast,
        }
      })

      state.locations = locationNames
    },
    [getLocations.rejected]: (state) => {
      console.log(state)
    },
    [getTrafficImages.pending]: (state) => {
      console.log(state)
    },
    [getTrafficImages.fulfilled]: (state, action) => {
      const selectedLocation = state.location
      const locations = state.locations

      // get the latitude and longitude for the selected city from the dropdown
      const result = locations.filter((obj) => obj.name === selectedLocation)
      if (result.length > 0) {
        const { latitude, longitude } = result[0].label_location

        const actionItems = action.payload.items[0].cameras
        // filter cameras by distance from given latitude and longitude
        const cameras = actionItems.filter((camera) => {
          const { latitude: lat, longitude: lon } = camera.location
          const distance = Math.sqrt((latitude - lat) ** 2 + (longitude - lon) ** 2)
          return distance < 0.01 // adjust this threshold as needed
        })
        // return image attribute and value of closest camera, or null if no cameras found
        if (cameras.length > 0) {
          const closestCamera = cameras.reduce((prev, curr) => {
            const { latitude: prevLat, longitude: prevLon } = prev.location
            const { latitude: currLat, longitude: currLon } = curr.location
            const prevDistance = Math.sqrt((latitude - prevLat) ** 2 + (longitude - prevLon) ** 2)
            const currDistance = Math.sqrt((latitude - currLat) ** 2 + (longitude - currLon) ** 2)
            return prevDistance < currDistance ? prev : curr
          })
          state.weatherURL = closestCamera.value
        } else {
          return null
        }
      } else return null
    },
    [getTrafficImages.rejected]: (state) => {
      console.log(state)
    },
  },
})

const { actions } = weatherSlice

export const { setDate, setTime, setNormal, setLocation } = actions

export default weatherSlice.reducer
