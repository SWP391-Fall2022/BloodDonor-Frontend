import styles from './internet.module.css';

export const NoPage = () => {
    return <div className={`${styles.mainBackground} ${styles.mainBackground404}`} />
};

export const NoPageOrganization = () => {
    return <div className={`${styles.mainBackground} ${styles.organization404}`} />
};