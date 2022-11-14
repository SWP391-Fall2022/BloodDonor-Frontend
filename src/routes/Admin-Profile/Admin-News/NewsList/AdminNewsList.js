import { useMemo } from "react";
import { useState } from "react";
import styles from "../../admin.module.css";
import EditNews from "../EditNews/EditNews";
import OverViewNews from "../OverviewNews/OverViewNews";
import { ViewNewsContext } from "../ViewNews/AdminViewNewsContext";
import ViewNews from "../ViewNews/ViewNews";
import NewsList from "./NewsList";

export default function AdminNewsList() {
  const [valueViewNews, setViewNews] = useState("");
  const [page, setPage] = useState(5);
  const [newsID, setNewsID] = useState();
  const value = useMemo(
    () => ({ valueViewNews, setViewNews, page, setPage }),
    [valueViewNews, setViewNews, page, setPage]
  );
  return (
    <>
      <div className={styles.mainContainer}>
        <ViewNewsContext.Provider value={value}>
          {/* reviewPage: Is the status edit*/}
          {console.log(page)}
          {page === 0 ? (
            <ViewNews />
          ) : page === 1 ? (
            <EditNews />
          ) : page === 2 ? (
            <OverViewNews />
          ) : (
            <NewsList/>
          )}
        </ViewNewsContext.Provider>
      </div>
    </>
  );
}
