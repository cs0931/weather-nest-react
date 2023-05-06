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

        // first check if there is an exact match for the latitude and longitude
        const matchedImages = actionItems.filter((item) => item.location.latitude === latitude && item.location.longitude === longitude)
        if (matchedImages.length > 0) {
          const imageURL = matchedImages.map((item) => item.image)
          state.trafficImageUrl = imageURL
        }
        // find the nearest location based on latitude and longitude
        else {
          const distances = actionItems.map((item) => {
            const latDiff = item.location.latitude - latitude
            const lonDiff = item.location.longitude - longitude
            const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff)
            return { item, distance }
          })

          const sortedDistances = distances.sort((a, b) => a.distance - b.distance)
          const nearestItem = sortedDistances[0].item

          state.trafficImageUrl = nearestItem.image
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
