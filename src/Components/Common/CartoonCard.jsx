import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Divider from "@mui/material/Divider";

const WEEK = {
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
  SUN: "일",
};

const CartoonCard = ({ cartoonInfo }) => {
  const [rankChange, setRankChange] = useState(0);
  const [rankChangeIcon, setRankChangeIcon] = useState(0);

  useEffect(() => {
    setRankChange(cartoonInfo.previousRank - cartoonInfo.currentRank);
  }, []);

  useEffect(() => {
    if (rankChange < 0) {
      setRankChangeIcon(1);
    } else if (rankChange > 0) {
      setRankChangeIcon(0);
    } else if (rankChange === 0) setRankChangeIcon(2);
  }, [rankChange]);

  const rankIcon = [
    {
      id: "rankup",
      icon: <ArrowDropUpIcon />,
    },
    {
      id: "rankdown",
      icon: <ArrowDropDownIcon />,
    },
    {
      id: "ranksame",
      icon: <HorizontalRuleIcon />,
    },
  ];

  return (
    <Card sx={{ display: "flex", height: "200px" }}>
      <CardActionArea sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box
          sx={{
            display: "flex",
            height: "200px",
            width: "80px",
          }}
        >
          <CardMedia
            component="img"
            height="120"
            width="80"
            image={cartoonInfo.thumbnailSrc}
            alt="green iguana"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "55px",
              padding: 0,
              alignItems: "center",
            }}
          >
            <Typography component="div" variant="h3">
              {cartoonInfo.currentRank}
            </Typography>
            <Typography
              component="div"
              variant="body2"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {rankIcon[rankChangeIcon].icon} {Math.abs(rankChange)}
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography component="div" variant="subtitle1">
              {cartoonInfo.title}
            </Typography>

            {cartoonInfo.artists.map((artist, index) => (
              <Typography variant="body2" key={artist.name}>
                {artist.name}{" "}
                {cartoonInfo.artists.length - 1 !== index ? "," : ""}
              </Typography>
            ))}

            <Divider />
            <Typography variant="body2">
              {cartoonInfo.freedEpisodeSize}화 무료
            </Typography>
            <Typography variant="body2">
              {cartoonInfo.contentsState === "completed"
                ? "완결"
                : `매주 ${WEEK[cartoonInfo.schedule.periods[0]]}요일 연재`}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(CartoonCard);
