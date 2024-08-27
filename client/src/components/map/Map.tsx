import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

import regionData from "constants/regionData.json";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Map({ tab }: { tab: string }) {
  const { selectedMonth, selectedYear } = useSelector(
    (state: RootState) => state.chartData
  );

  const position: L.LatLngExpression = [36.2, 127.8];

  const markers = useMemo(() => {
    const dataToDisplay = tab === "month" ? selectedMonth : selectedYear;

    return dataToDisplay.map((data) => {
      const regionInfo = regionData.find((region) => region.id === data.region);
      if (regionInfo) {
        return (
          <Marker
            key={regionInfo.id}
            position={[regionInfo.latitude, regionInfo.longitude]}
          >
            <Popup>{regionInfo.name}</Popup>
          </Marker>
        );
      }
      return null;
    });
  }, [tab, selectedMonth, selectedYear]);

  return (
    <MapContainer
      center={position}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
    </MapContainer>
  );
}
