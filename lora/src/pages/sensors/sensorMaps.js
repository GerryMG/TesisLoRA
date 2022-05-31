import React from 'react';
import { MapContainer, TileLayer, useMap, Marker,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const position = [13.680218380437124, -89.23616217214374];


class PageSensorsMap extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <MapContainer style={{ height: 'calc(100% - 78px)', width: '100%' }}
             center={position} zoom={25} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.props.list.map(sn => (
                 <Marker key={sn.id} position={[sn.latitud_value,sn.longitud_value]}>
                 <Popup>
                   {sn.name}<br />
                 </Popup>
               </Marker>
            ))}
           
          </MapContainer>

        )
    }
}

export default PageSensorsMap;