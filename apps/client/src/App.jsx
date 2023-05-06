import './App.css'
import { Container, Grid } from '@mui/material'
import { DatePickerComponent } from './components/DatePicker'
import { TimePickerComponent } from './components/TimePicker'
import { HomeDisplay } from './components/HomeDisplay'
import { Location } from './components/Location'
import { WeatherBox } from './components/WeatherBox'
import { TrafficBox } from './components/TrafficBox'

function App() {
  return (
    <div className="bg_img">
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <HomeDisplay></HomeDisplay>
          </Grid>
          <Grid item>
            <DatePickerComponent> </DatePickerComponent>
          </Grid>
          <Grid item>
            <TimePickerComponent></TimePickerComponent>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Location></Location>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <WeatherBox></WeatherBox>
          </Grid>
          <Grid>
            <TrafficBox></TrafficBox>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
