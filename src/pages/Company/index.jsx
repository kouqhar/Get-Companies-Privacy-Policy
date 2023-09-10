// Components
import Points from "../../components/PolicyCard/Points";

// Styles
import styles from "./styles/styles.module.css";

const Company = () => {
  const getPoints = JSON.parse(localStorage.getItem("company-points"));
  const [grade, name, image] = getPoints[0];
  const points = getPoints[1];

  return (
    <div className={styles.company_points__container}>
      <div className={styles.company_points__container___header}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p className="privacy_content__header___grade">
          {grade ? `Privacy ${grade}` : ""}
        </p>
      </div>
      <div className={styles.company_points__container___content}>
        {points?.map((point) => (
          <Points key={`${point.id}-${point.case_id}`} {...point} />
        ))}
      </div>
    </div>
  );
};

export default Company;
