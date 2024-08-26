import { Box } from "@mui/material";

export default function FlexBox({
  children,
  rwd,
}: {
  children: React.ReactNode;
  rwd: boolean;
}) {
  return (
    <Box
      sx={{
        display: rwd ? { sm: "block", md: "flex" } : "flex",
        flexWrap: rwd ? "" : "wrap",
        alignItems: "center",
        margin: 2,
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}
