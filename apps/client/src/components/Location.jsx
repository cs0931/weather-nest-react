import { Box, TextField, MenuItem } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setLocation, getTrafficImages } from '../features/weather/weatherSlice'

export const Location = () => {
  const { locations, date, time } = useSelector((store) => store.weather)

  const [selectedLocation, setSelectedLocation] = useState('')

  const dispatch = useDispatch()

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value)
    dispatch(setLocation(event.target.value))
    if (date != null && date != '' && time != null && time != '' && event.target.value != null && event.target.value != '') {
      // get the latitude and longitude for the selected city from the dropdown
      const result = locations.filter((obj) => obj.name === event.target.value)
      if (result.length > 0) {
        const { latitude, longitude } = result[0].label_location

        dispatch(
          getTrafficImages({
            dateTime: date.toDate().toLocaleDateString('en-CA') + 'T' + time.format('HH:mm:ss'),
            latitude: latitude,
            longitude: longitude,
          })
        )
      }
    }
  }

  const menuItems = locations.map((obj) => (
    <MenuItem key={`${obj.label_location.latitude},${obj.label_location.longitude}`} value={obj.name}>
      {obj.name}
    </MenuItem>
  ))

  return (
    <Box>
      <TextField
        className="input"
        select
        label="Location"
        value={selectedLocation}
        sx={{
          width: { sm: 200, md: 450 },
        }}
        onChange={handleLocationChange}
      >
        {menuItems}
      </TextField>
    </Box>
  )
}
export default Location
