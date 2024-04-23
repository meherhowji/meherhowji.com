import Error from "@/public/assets/404/error.svg";
import styles from "@/styles/page-css/not-found.module.css";

export default function Custom404() {
  return (
    <>
      {/* // TODO: add top posts and links for the user to navigate across */}
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.lostAstronaut}>
            <Error />
          </div>
          <div className={styles.errorContent}>
            <h1 className={styles.errorTitle}>404</h1>
            <h2 className={styles.errorMessage}>This page could not be found.</h2>
          </div>
        </div>
      </div>
    </>
  );
}

/* <meta name="robots" content="noindex,follow"> */
