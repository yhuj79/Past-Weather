# Past-Weather

<img align=top src="https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/thumbnail.png" width="600">

과거 기상 데이터 차트 분석 웹 서비스

:ballot_box_with_check: <a target="_blank" rel="noopener noreferrer" href="https://past-weather.vercel.app">Past Weather</a>

## Built With

<p>
  <img alt="React" src="https://img.shields.io/badge/React-51CBF3?style=flat&logo=react&logoColor=white" height=25 />
  <img alt="Typescript" src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white" height=25 />
  <img alt="Redux" src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white" height=25 />
  <img alt="MUI" src="https://img.shields.io/badge/MUI-007FFF?style=flat&logo=MUI&logoColor=white" height=25 />
  <img alt="ApexChart" src="https://img.shields.io/badge/ApexChart-00E396?style=flat&logo=Chartdotjs&logoColor=white" height=25 />
  <img alt="Leaflet" src="https://img.shields.io/badge/Leaflet-199900?style=flat&logo=Leaflet&logoColor=white" height=25 />
</p>

## About The Project

### :alarm_clock: 제작 기간

- 2024.08.16 ~ 2024.09.05

### :gear: 개발 환경

- Visual Studio Code
- React.js 18.3.1

### :clipboard: 주요 적용 사항

<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-1.png width=400>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-2.png width=400>
</div>

<br>

- 월별, 연도별 선택하여 기상 데이터 확인
- [Apex Chart](https://apexcharts.com), [Leaflet](https://leafletjs.com) 사용

<br>

<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-3.gif width=800>
</div>

<br>

- [날짜](https://github.com/yhuj79/Past-Weather/blob/main/client/src/components/selector/InputDate.tsx), [지역](https://github.com/yhuj79/Past-Weather/blob/main/client/src/components/selector/InputRegion.tsx), [데이터 타입](https://github.com/yhuj79/Past-Weather/blob/main/client/src/components/selector/DataTypeSelector.tsx) (기온, 습도, 강수량 등) 설정
- 선택한 데이터를 [라인 차트](https://github.com/yhuj79/Past-Weather/blob/main/client/src/components/chart/Line.tsx)로 시각화 (월별/연도별)
- 데이터 레이블 표시 ON/OFF

<br>

<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-4.gif width=800>
</div>

<br>

- 선택한 데이터가 상단에 [데이터칩](https://github.com/yhuj79/Past-Weather/blob/main/client/src/components/selector/DataChips.tsx) 형태로 출력 (우측 x 버튼으로 삭제)
- 추가, 삭제에 따라 동적으로 차트 변화
- 하단 [도넛 차트](https://github.com/yhuj79/Past-Weather/blob/main/client/src/components/chart/DonutTa.tsx)로 평균 기온, 습도 분포 시각화

<br>

<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-5.gif width=800>
</div>

<br>

- 선택한 지역을 기본값으로 [주간 예보](https://github.com/yhuj79/Past-Weather/blob/main/client/src/components/forecast/Forecast.tsx)를 출력
- 다른 지역도 확인 가능

<br>

<div>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-6.png width=200>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-7.png width=200>
    <img align=top src=https://raw.githubusercontent.com/yhuj79/Past-Weather/main/assets/readme-8.png width=200>
</div>

<br>

- 반응형 디자인 적용

<br>

### :open_file_folder: Package

- [x] typescript 4.9.5
- [x] reduxjs/toolkit 2.2.7
- [x] mui/material 5.16.7
- [x] apexcharts 3.52.0
- [x] react-apexcharts 1.4.1
- [x] axios 1.7.4
- [x] dayjs 1.11.12
- [x] leaflet 1.9.4
- [x] react-leaflet 4.2.1
- [x] normalize.css 8.0.1

## Reference

[https://www.data.go.kr/data/15059093/openapi.do](https://www.data.go.kr/data/15059093/openapi.do)

[https://www.weather.go.kr/w/index.do](https://www.weather.go.kr/w/index.do)

[https://www.weather.go.kr/w/observation/land/past-obs/obs-by-day.do](https://www.weather.go.kr/w/observation/land/past-obs/obs-by-day.do)

[https://openweathermap.org/api/one-call-api](https://openweathermap.org/api/one-call-api)

[https://apexcharts.com](https://apexcharts.com)

[https://leafletjs.com](https://leafletjs.com)

[https://leaflet-extras.github.io/leaflet-providers/preview](https://leaflet-extras.github.io/leaflet-providers/preview)