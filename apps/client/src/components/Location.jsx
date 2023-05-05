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
    if (date != null && date != '' && time != null && time != '' && selectedLocation != null && selectedLocation != '') {
      dispatch(getTrafficImages(date.toDate().toLocaleDateString('en-CA') + 'T' + time.format('HH:mm:ss')))
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
