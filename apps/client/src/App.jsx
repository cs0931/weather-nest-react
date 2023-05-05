import './App.css'
import { Container, Grid } from '@mui/material'
import { HomeDisplay } from '../src/components/HomeDisplay'

function App() {
  return (
    <div className="bg_img">
      <Container>
        {' '}
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <HomeDisplay></HomeDisplay>
          </Grid>
          <Grid item></Grid>
          <Grid item></Grid>
          <Grid item xs={12} sm={12} md={12}></Grid>

          <Grid item xs={12} sm={12} md={12}></Grid>
          <Grid></Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
