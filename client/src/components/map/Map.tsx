import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

import CloseButton from "components/map/CloseButton";
import regionData from "constants/regionData.json";

import { useMediaQuery } from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";

// 초기 중심 위치 설정
const position: L.LatLngExpression = [35.97, 127.83];
// 최대 경계 설정
const bounds = L.latLngBounds(
  [32.5, 123.5], // 남서 좌표 (제주 남서쪽)
  [39.0, 132.0] // 북동 좌표 (강원도 북동쪽)
);

// 지도 컴포넌트
export default function Map({
  tab,
  modal,
}: {
  tab: string;
  modal?: () => void;
}) {
  const { selectedMonth, selectedYear } = useSelector(
    (state: RootState) => state.chartData
  );
  const is1160Up = useMediaQuery("(min-width:1160px)");

  // 지도에 표시할 마커 생성
  const markers = useMemo(() => {
    const dataToDisplay = tab === "month" ? selectedMonth : selectedYear;
    // 중복을 제거한 지역 id 목록 생성
    const uniqueRegionIds = Array.from(
      new Set(dataToDisplay.map((data) => data.region))
    );
    // 지역 id에 따른 마커 생성
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
      center={position} // 초기 중심 좌표
      zoom={modal ? 7.0 : 7.5} // 초기 줌 레벨
      zoomSnap={0.5} // 줌 레벨 스냅
      maxBounds={bounds} // 최대 경계 설정
      maxBoundsViscosity={1.0} // 경계의 견고 정도 제어 (1.0일 경우 완전히 견고해져 경계 밖으로 드래그 불가)
      style={{
        height: "100%",
        width: "100%",
        borderRadius: is1160Up ? "" : "10px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        maxZoom={10} // 최대 줌 레벨
        minZoom={modal ? 7.0 : 7.5} // 최소 줌 레벨
      />
      {markers}
      {modal && <CloseButton modal={modal} />}
    </MapContainer>
  );
}
