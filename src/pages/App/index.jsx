import { useState, useEffect } from "react";

// Utils
import {
  fetchCompanyPrivacyByName,
  fetchCompanyPrivacyService,
} from "../../utils/apis";

// Components
import PolicyCard from "../../components/PolicyCard";

// Styles
import styles from "./styles/styles.module.css";

// Variables
import Companies from "../../DB/Companies";

const App = () => {
  localStorage.removeItem("company-points");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [privacies, setPrivacies] = useState([]);
  const [searchedPrivacy, setSearchedPrivacy] = useState([]);

  const fetchByName = async (company, controller) =>
    await fetchCompanyPrivacyByName(company, controller);
  const fetchByService = async (url, controller) =>
    await fetchCompanyPrivacyService(url, controller);

  // Return default privacy response
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    // Fetch by name
    const showDefault = Companies.map((company) =>
      fetchByName(company, controller.signal)
    );

    // Fetch by rest service
    Promise.all(showDefault).then((values) => {
      const restService = values.map((elem) =>
        fetchByService(elem?.links?.crisp?.api, controller.signal)
      );
      Promise.all(restService).then((result) => {
        setPrivacies(result);
        setLoading(false);
      });
    });

    // return () => controller.abort()
  }, []);

  // Debounce input and return response
  useEffect(() => {
    const controller = new AbortController();
    setError(false);

    if (companyName.length <= 0) setSearchedPrivacy([]);
    else {
      const getName = setTimeout(() => {
        setLoading(true);
        fetchByName(companyName, controller.signal).then((res) => {
          if (res === undefined) {
            setError(true);
            setLoading(false);
          } else {
            const grade = res?.rating?.human;
            if (res)
              fetchByService(res?.links?.crisp?.api).then((result) => {
                setSearchedPrivacy([{ grade, ...result }]);
                setError(false);
                setLoading(false);
              });
          }
        });
      }, 2000);

      return () => {
        clearTimeout(getName);
        controller.abort();
      };
    }
  }, [companyName]);

  // Conditionally render policy
  let PrivacyPolicy = <h1>Loading privacy policy . . . </h1>;

  if (!loading && searchedPrivacy.length <= 0)
    PrivacyPolicy = privacies?.map((elem) => (
      <PolicyCard key={`${elem.name}-${elem.id}`} {...elem} />
    ));
  if (!loading && searchedPrivacy.length > 0)
    PrivacyPolicy = searchedPrivacy?.map((elem) => (
      <PolicyCard key={`${elem.name}-${elem.id}`} {...elem} />
    ));
  if (error && companyName.length > 0)
    PrivacyPolicy = (
      <h1>
        Couldn&apos;t find privacy policy for your searched company{" "}
        {companyName} . . .
      </h1>
    );

  return (
    <>
      <div className={[styles.search_container, "search_containey"].join(" ")}>
        <div className={styles.search_container__content}>
          <label htmlFor="companyName">Enter company name: </label>
          <input
            name="companyName"
            placeholder="Company"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
        </div>
        <div className={styles.search_container__thanks}>
          <p className={styles.search_container__thanks___links}>
            Special thanks to <a href="https://tosdr.org/">TOSDR</a> and
            <a href="https://tosdr.org/en/community"> THE COMMUNITY</a>
          </p>
        </div>
      </div>

      <div className={styles.privacy_container}>{PrivacyPolicy}</div>
    </>
  );
};

export default App;
