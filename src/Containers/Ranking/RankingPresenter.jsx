import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Ranking/Header";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RankingContext from "../../modules/RankingContext";
import { styled as mui } from "@mui/material/styles";
import CartoonCard from "../../Components/Common/CartoonCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const CustomGrid = mui(Grid)({
  marginTop: "50px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RankingPresenter = () => {
  const { comicRankList, menus, selectedOption } = useContext(RankingContext);

  const [comicList, setComicList] = useState([]);

  useEffect(() => {
    setComicList(comicRankList);
  }, [comicRankList]);

  useEffect(() => {
    setComicList(
      comicRankList
        .filter((comic) => {
          if (selectedOption !== "")
            return comic.contentsState === selectedOption;
          else return true;
        })
        .filter((comic) => {
          if (menus[2].clicked === true) {
            return comic.freedEpisodeSize * 1 >= 3;
          } else return true;
        })
    );
  }, [comicRankList, menus]);

  return (
    <Wrapper>
      <Header genre={"로맨스"} />
      <CustomGrid container spacing={2}>
        {comicList.map((item) => (
          <Grid item key={item.id} style={{ width: "100%" }}>
            <CartoonCard cartoonInfo={item} />
          </Grid>
        ))}
      </CustomGrid>
    </Wrapper>
  );
};

export default RankingPresenter;
