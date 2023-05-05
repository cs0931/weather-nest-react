import { useSelector } from 'react-redux'
import { Box } from '@mui/material'

export const TrafficBox = () => {
  const { trafficImageUrl } = useSelector((store) => store.weather)

  // display the traffic image only if location is selected
  if (!trafficImageUrl) return null

  return (
    <div className="box_container">
      <div className="box">
        <Box
          component="img"
          alt="..."
          src="https://images.data.gov.sg/api/traffic-images/2023/05/00a3d10d-a34c-434c-ab35-a76503b6e4e6.jpg"
        />
      </div>
    </div>
  )
}
export default TrafficBox
