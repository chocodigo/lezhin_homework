import React, { useEffect, useState } from "react";
import RankingContext from "../../modules/RankingContext";
import RankingPresenter from "./RankingPresenter";
import { getRankingInfo } from "../../api/ranking";

const RankingConatianer = () => {
  const [menus, setMenus] = useState([
    {
      id: "scheduled",
      name: "연재중",
      clicked: false,
    },
    {
      id: "completed",
      name: "완결",
      clicked: false,
    },
    {
      id: "free",
      name: "무료회차 3개 이상",
      clicked: false,
    },
  ]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(0);
  const [count, setCount] = useState(0);
  const [comicRankList, setComicRankList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(async () => {
    const { data } = await getRankingInfo({ page });
    setCount(data.count);
    setComicRankList(comicRankList.concat(data.data));
    setHasNext(data.hasNext);
  }, [page]);

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", scrollHandler);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  const onClickMenuHandler = (menuId) => {
    setMenus(
      menus.map((menu) =>
        menu.id === menuId ? { ...menu, clicked: !menu.clicked } : menu
      )
    );

    if (menuId === "scheduled" || menuId === "completed") {
      if (menuId === selectedOption) setSelectedOption("");
      else setSelectedOption(menuId);
    }
  };

  useEffect(() => {
    if (selectedOption === "scheduled" && menus[1].clicked === true) {
      setMenus(
        menus.map((menu) =>
          menu.id === "completed" ? { ...menu, clicked: false } : menu
        )
      );
    } else if (selectedOption === "completed" && menus[0].clicked === true) {
      setMenus(
        menus.map((menu) =>
          menu.id === "scheduled" ? { ...menu, clicked: false } : menu
        )
      );
    }
  }, [selectedOption]);

  const scrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && hasNext) {
      const currPage = page;
      setPage(currPage + 1);
    }
  };

  const state = { onClickMenuHandler, comicRankList, menus, selectedOption };
  return (
    <RankingContext.Provider value={state}>
      <RankingPresenter />
    </RankingContext.Provider>
  );
};

export default RankingConatianer;
