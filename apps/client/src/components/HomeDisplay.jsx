import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export const HomeDisplay = () => {
  const { displayText } = useSelector((store) => store.weather)

  return (
    <Typography variant="h1" className="city" sx={{ typography: { sm: 'h1', xs: 'h2' } }}>
      {displayText}
    </Typography>
  )
}
export default HomeDisplay
