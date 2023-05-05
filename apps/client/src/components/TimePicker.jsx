import { LocalizationProvider } from '@mui/x-date-pickers'
import { MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTime, getLocations } from '../features/weather/weatherSlice'
import { useState } from 'react'

export const TimePickerComponent = () => {
  const [newTime, setNewTime] = useState()

  const dispatch = useDispatch()
  const { date, time } = useSelector((state) => state.weather)

  const handleTimeChange = (newTime) => {
    setNewTime(newTime)
    dispatch(setTime(newTime))
  }
  const handleClose = () => {
    if (time != null && time != '' && date != null && date != '') {
      dispatch(getLocations(date.toDate().toLocaleDateString('en-CA') + 'T' + newTime.format('HH:mm:ss')))
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        className="input"
        label="Time"
        views={['hours', 'minutes', 'seconds']}
        value={newTime}
        renderInput={(params) => <TextField {...params} />}
        onChange={handleTimeChange}
        onClose={handleClose}
      />
    </LocalizationProvider>
  )
}

export default TimePickerComponent
