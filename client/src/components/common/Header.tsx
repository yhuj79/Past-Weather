import { useState } from "react";

import SideMenu from "./SideMenu";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import InfoModal from "./InfoModal";

// 헤더 컴포넌트
export default function Header() {
  const [menu, setMenu] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginBottom: 0.25 }}
          >
            Past Weather
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            sx={{ mr: -1.5 }}
            onClick={() => setModal(true)}
          >
            <InfoTwoToneIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideMenu menu={menu} setMenu={setMenu} />
      <InfoModal modal={modal} setModal={setModal} />
    </Box>
  );
}
