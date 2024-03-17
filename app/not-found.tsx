import Image from "next/image";
import Error from "@/public/assets/404/error.svg";
import styles from "@/styles/page-css/not-found.module.css";

export default function Custom404() {
  return (
    <>
      {/* // TODO: add top posts and links for the user to navigate across */}
      <div className={styles.container}>
        <div>
          <Image src={Error} width={200} height={200} alt={"An illustration of an astronaut lost in space"} />
          <div className={styles.errorContent}>
            <h1 className={styles.errorTitle}>404</h1>
            <div className={styles.errorMessage}>
              <h2>This page could not be found.</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* <meta name="robots" content="noindex,follow"> */
