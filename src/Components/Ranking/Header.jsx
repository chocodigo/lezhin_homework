import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled as mui } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MenuItem from "@mui/material/MenuItem";
import RankingContext from "../../modules/RankingContext";

const CustomAppBar = mui(AppBar)({
  backgroundColor: "white",
  color: "black",
});

const MenuButton = mui(Button)((props) => ({
  marginLeft: "20px",
}));

const Header = ({ genre }) => {
  const { onClickMenuHandler, menus } = useContext(RankingContext);
  return (
    <CustomAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {genre} 장르 랭킹
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            {menus.map((item) => (
              <MenuButton
                sx={{ my: 2, display: "block" }}
                key={item.id}
                onClick={() => onClickMenuHandler(item.id)}
                variant={item.clicked ? "contained" : "outlined"}
              >
                <Typography textAlign="center">{item.name}</Typography>
              </MenuButton>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </CustomAppBar>
  );
};

export default React.memo(Header);
