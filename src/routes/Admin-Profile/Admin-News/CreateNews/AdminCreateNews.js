import { AdBread } from "../../AdminBreadcrumbs";
import styles from "../../admin.module.css";
import CreateNews from "./CreateNews";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { CreateNewsContext } from "./AdminCreateNewsContext";
import PreviewNews from "../PreviewNews/PreviewNews";
export default function AdminCreateNews() {
  const [valueCreateNews, setCreateNews] = useState("");
  const [previewPage, setPage] = useState(0);
  const value = useMemo(
    () => ({ valueCreateNews, setCreateNews, previewPage, setPage }),
    [valueCreateNews, setCreateNews, previewPage, setPage]
  );
  return (
    <>
      <div className={styles.mainContainer}>
      <CreateNewsContext.Provider value={value}>
      {/* reviewPage: Is the status preview*/}
      
      {previewPage === 0 ? (
                <CreateNews />
              ) : (
                <PreviewNews />
              )}
            </CreateNewsContext.Provider>
      </div>
    </>
  );
}
