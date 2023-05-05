import { useSelector } from 'react-redux'

export const WeatherBox = () => {
  const { locations, location } = useSelector((store) => store.weather)
  // display the forcast only if location is selected
  if (!location) {
    return null
  }
  const filteredData = locations.filter((item) => item.name === location)

  return (
    <div className="box_container">
      <div className="box">
        <p>{location}</p>
        {filteredData.length > 0 && filteredData[0].forecast && <h3>{filteredData[0].forecast}</h3>}
      </div>
    </div>
  )
}
export default WeatherBox
