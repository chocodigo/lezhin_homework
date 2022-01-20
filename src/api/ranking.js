import HttpClient from "./HttpClient";

export const getRankingInfo = ({ page }) => {
  return HttpClient.get(`api/comics/romance?page=${page}`);
};
