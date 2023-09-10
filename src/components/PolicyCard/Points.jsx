import { useState } from "react";

// Api
import { fetchCompanyPrivacyCase } from "../../utils/apis";

// Styles
import styles from "./styles/pointStyles/pointStyles.module.css";

const Points = ({ title, case_id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => setIsOpen((prevState) => !prevState);

  // TODO: GET AND DISPLAY INDIVIDUAL PRIVACY
  const handleCaseOnClick = async (param) => {
    const controller = new AbortController();

    const response = fetchCompanyPrivacyCase(param, controller.signal);
    Promise.resolve(response).then((value) =>
      console.log("Response : ", value)
    );

    return () => controller.abort();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal} onClick={handleModal}>
          <div className={styles.modal_content}>
            <p>Modal is open</p>
          </div>
        </div>
      )}
      <p
        className={styles.privacy_points}
        onClick={() => {
          // handleCaseOnClick(case_id)
          // handleModal()
        }}
      >
        {title}
      </p>
    </>
  );
};

export default Points;
