import { AdBread } from "../../AdminBreadcrumbs";
import styles from "../../admin.module.css";
import CreateNews from "./CreateNews";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { CreateNewsContext } from "./AdminCreateNewsContext";
import PreviewNews from "../PreviewNews/PreviewNews";
export default function AdminCreateNews() {
  const breadName = (
    <>
      <Link to="/admin/news_list">
        <ArrowLeftOutlined style={{ marginRight: "2%", color: "black" }} />
      </Link>
      Tạo tin tức
    </>
  );
  const layer1 = <Link to="/admin/news_list">Quản lí tin tức</Link>;
  const [valueCreateNews, setCreateNews] = useState("");
  const [previewPage, setPage] = useState(0);
  const value = useMemo(
    () => ({ valueCreateNews, setCreateNews, previewPage, setPage }),
    [valueCreateNews, setCreateNews, previewPage, setPage]
  );
  return (
    <>
      <div className={styles.breadcrumb}>
        <AdBread
          layer1={layer1}
          layer2="Tạo tin tức"
          name={breadName}
        />
      </div>
      <div className={styles.mainContainer}>
      <CreateNewsContext.Provider value={value}>
      {/* reviewPage: Is the status preview*/}
      {console.log(previewPage)}
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
