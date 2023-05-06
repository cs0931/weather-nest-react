import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

export const TrafficBox = () => {
  const { trafficImageUrl } = useSelector((store) => store.weather)

  // display the traffic image only if location is selected
  if (!trafficImageUrl) return null

  return (
    <div className="box_container">
      <div className="box">
        <Box component="img" alt="..." src={trafficImageUrl} />
      </div>
    </div>
  )
}
export default TrafficBox
