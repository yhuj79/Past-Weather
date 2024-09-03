// 탭 화면 베이스 스타일
export const tabStyle = {
  padding: 0,
  height: "calc(100% - 49px)",
  overflowY: "scroll",
};

// 지도 모달 베이스 스타일
export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "10px",
  boxShadow: 24,
};

// 반응형 박스 스타일
export const rwdBoxStyle = (mediaQuery: boolean) => ({
  display: mediaQuery ? "flex" : "block",
  alignItems: "center",
  margin: 2,
  gap: 2,
  "& > *:not(:last-child)": {
    marginBottom: mediaQuery ? 0 : 2,
  },
});
