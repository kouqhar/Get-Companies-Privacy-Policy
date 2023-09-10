import { Link } from "react-router-dom";

// Components
import Points from "./Points";

// Styles
import styles from "./styles/styles.module.css";

const PolicyCard = ({ name, image, grade, points }) => {
  const acceptedPoints = points?.filter(
    (point) => point.status.toLowerCase() === "approved".toLowerCase()
  );

  return (
    <div className={styles.privacy_content}>
      <section className={styles.privacy_content__header}>
        <img
          className={styles.privacy_content__header___image}
          src={image}
          alt={name}
        />
        <p className={styles.privacy_content__header___grade}>{grade}</p>
      </section>
      <div className={styles.privacy_content__name}>
        <h2>{name}</h2>
      </div>
      <div className={styles.privacy_content__cases}>
        {acceptedPoints?.slice(0, 5)?.map((point) => (
          <Points key={point.case_id} {...point} />
        ))}
      </div>
      <Link
        to="/company"
        onClick={() =>
          localStorage.setItem(
            "company-points",
            JSON.stringify([[grade, name, image], [...acceptedPoints]])
          )
        }
        className={styles.privacy_content__cases___more}
      >
        View all points{" "}
      </Link>
    </div>
  );
};

export default PolicyCard;
