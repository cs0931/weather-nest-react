import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setDate, getLocations } from '../features/weather/weatherSlice'
import { useState } from 'react'

export function DatePickerComponent() {
  const dispatch = useDispatch()
  const [newDate, setNewDate] = useState()

  const { time } = useSelector((store) => store.weather)

  const handleDateChange = (newDate) => {
    setNewDate(newDate)
    dispatch(setDate(newDate))
    if (newDate != null && newDate != '' && time != null && time != '') {
      dispatch(getLocations(newDate.toDate().toLocaleDateString('en-CA') + 'T' + time.format('HH:mm:ss')))
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="input"
        label="Date"
        value={newDate}
        renderInput={(params) => <TextField {...params} />}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  )
}

export default DatePickerComponent
