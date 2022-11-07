import styles from "../../admin.module.css";
import { useState, useMemo } from "react";
import ViewNews from "./ViewNews";
import { ViewNewsContext } from "./AdminViewNewsContext";
import EditNews from "../EditNews/EditNews";
import OverViewNews from "../OverviewNews/OverViewNews";
import { useLocation } from "react-router-dom";
export default function AdminViewNews() {
  const location = useLocation();
  const { record } = location.state;
  const [valueViewNews, setViewNews] = useState(record);
  const [page, setPage] = useState(0);
  const value = useMemo(
    () => ({ valueViewNews, setViewNews, page, setPage }),
    [valueViewNews, setViewNews, page, setPage]
  );
  return (
    <div className={styles.mainContainer}>
      <ViewNewsContext.Provider value={value}>
        {/* reviewPage: Is the status edit*/}
        {console.log(page)}
        {page === 0 ? <ViewNews /> : page === 1 ? <EditNews /> : <OverViewNews />}
      </ViewNewsContext.Provider>
    </div>
  );
}
