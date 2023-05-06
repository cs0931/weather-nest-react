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
      <Container maxWidth="xs">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <div className="center">
              <HomeDisplay></HomeDisplay>
            </div>
          </Grid>
          <Grid item md={6}>
            <DatePickerComponent> </DatePickerComponent>
          </Grid>
          <Grid item md={6}>
            <TimePickerComponent></TimePickerComponent>
          </Grid>

          <div className="center"></div>
          <Grid item>
            <Location></Location>
          </Grid>
          <Grid item xs={12}>
            <WeatherBox></WeatherBox>
          </Grid>
          <Grid item xs={12}>
            <TrafficBox></TrafficBox>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
