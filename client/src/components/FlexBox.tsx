import { Box } from "@mui/material";

export default function FlexBox({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", margin: 2, gap: 2 }}
      {...props}
    >
      {children}
    </Box>
  );
}
