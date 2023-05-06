import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const weatherURL = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?'
// const trafficURL = 'https://api.data.gov.sg/v1/transport/traffic-images?'
const nestApi = 'http://localhost:5173/api/getTrafficImages?'

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

export const getTrafficImages = createAsyncThunk('weather/getTrafficImages', async ({ dateTime, latitude, longitude }) => {
  return fetch(
    nestApi +
      new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        date_time: dateTime,
      })
  )
    .then((resp) => resp.text())
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
      const imageUrl = action.payload
      state.trafficImageUrl = imageUrl
    },
    [getTrafficImages.rejected]: (state) => {
      console.log(state)
    },
  },
})

const { actions } = weatherSlice

export const { setDate, setTime, setNormal, setLocation } = actions

export default weatherSlice.reducer
