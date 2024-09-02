import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

import CloseButton from "components/map/CloseButton";
import regionData from "constants/regionData.json";

import { useMediaQuery } from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const position: L.LatLngExpression = [35.97, 127.83];
const bounds = L.latLngBounds(
  [32.5, 123.5], // 남서 좌표 (예시: 제주 남서쪽)
  [39.0, 132.0] // 북동 좌표 (예시: 강원도 북동쪽)
);

export default function Map({
  tab,
  modal,
}: {
  tab: string;
  modal?: () => void;
}) {
  const is1160Up = useMediaQuery("(min-width:1160px)");

  const { selectedMonth, selectedYear } = useSelector(
    (state: RootState) => state.chartData
  );

  const markers = useMemo(() => {
    const dataToDisplay = tab === "month" ? selectedMonth : selectedYear;
    const uniqueRegionIds = Array.from(
      new Set(dataToDisplay.map((data) => data.region))
    );

    return uniqueRegionIds.map((regionId) => {
      const regionInfo = regionData.find((region) => region.id === regionId);
      if (regionInfo) {
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; transform: translateY(-90%);">
              <div style="white-space: nowrap; font-family: 'Noto Sans KR', sans-serif; font-size: 15px; font-weight: bold; color: #000; text-shadow: -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF;">
                  ${regionInfo.name}
              </div>
              <img src="${markerIcon}" style="width: 25px; height: 41px;"/>
          </div>
          `,
        });

        return (
          <Marker
            key={regionInfo.id}
            position={[regionInfo.latitude, regionInfo.longitude]}
            icon={customIcon}
          />
        );
      }
      return null;
    });
  }, [tab, selectedMonth, selectedYear]);

  return (
    <MapContainer
      center={position}
      zoom={modal ? 7.0 : 7.5}
      zoomSnap={0.5}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: is1160Up ? "" : "10px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        maxZoom={10}
        minZoom={modal ? 7.0 : 7.5}
      />
      {markers}
      {modal && <CloseButton modal={modal} />}
    </MapContainer>
  );
}
