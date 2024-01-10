import './Mappa.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

function Mappa() {

  return (
    <>
         <MapContainer center = {[10 , 10]} zoom={30} scrollWheelZoom={true} className='h-screen' >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{1}/{2}/{3}.png'
        />
        <LocationMarker location={location}/>
      </MapContainer>
    </>
  )
}

export default Mappa
