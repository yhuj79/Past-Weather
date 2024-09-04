import { defaultModalStyle } from "styles/base";

import { Box, Fade, Modal, Typography } from "@mui/material";

// 헤더 우측 정보 컴포넌트
export default function InfoModal({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: (value: boolean) => void;
}) {
  return (
    <Modal
      sx={{ zIndex: 10000 }}
      open={modal}
      onClose={() => setModal(false)}
      closeAfterTransition
    >
      <Fade in={modal}>
        <Box sx={defaultModalStyle} tabIndex={-1}>
          <Typography variant="h6" component="h2">
            사이트 안내
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Past Weather는 과거 날씨 정보를 검색하고, 선택한 날씨 데이터들을
            비교해볼 수 있는 사이트입니다.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            기상청 종관기상관측 (ASOS) 데이터를 사용합니다.
          </Typography>
          <Typography variant="body2" sx={{ color: "#F44336" }}>
            이 API는 빈번하게 서버 에러가 발생하므로 데이터를 불러올 때 몇 번의
            재요청이 필요할 수 있습니다.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            비교적 최근 (2000년대) 데이터가 일부 존재하지 않는 지역은 목록에서
            제외되었습니다.
          </Typography>
          <Typography variant="body2" sx={{ color: "#2934cc" }}>
            제외된 지점 : 경주, 고창, 광양, 김해, 보성, 세종, 순창, 순천, 양산,
            영광, 의령, 정선, 진도, 함양, 홍성
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            유인관서 지점을 제외한 지역은 1980년대 이전 데이터가 존재하지 않는
            경우가 많습니다.
          </Typography>
          <Typography variant="body2" sx={{ color: "#2934cc", mb: 1 }}>
            유인관서 지점 : 강릉, 대구, 목포, 부산, 서울, 인천, 전주
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
