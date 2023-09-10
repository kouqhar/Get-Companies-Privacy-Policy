import axios from "axios";
const { VITE_BASE_URL, VITE_PRIVACY_PATH, VITE_PRIVACY_CASE } = import.meta.env;

// Axios Instance
const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  // timeout: 1000,
});

const getCompanyPrivacyPath = VITE_PRIVACY_PATH;
const getCompanyPrivacyCase = VITE_PRIVACY_CASE;

const fetchCompanyPrivacyByName = async (company, signal) => {
  try {
    const options = {
      method: "GET",
      url: `${getCompanyPrivacyPath}/?query=${company}`,
      signal,
    };
    const response = await axiosInstance(options);
    const data = response?.data?.parameters?.services.find(
      (elem) => elem?.is_comprehensively_reviewed
    );

    return data;
  } catch (err) {
    return err;
  }
};

const fetchCompanyPrivacyService = async (url, signal) => {
  const options = {
    method: "GET",
    url,
    signal,
  };

  try {
    const restServiceResponse = await axios(options);
    return restServiceResponse?.data?.parameters;
  } catch (err) {
    return err;
  }
};

const fetchCompanyPrivacyCase = async (case_id, signal) => {
  const options = {
    method: "GET",
    url: `${getCompanyPrivacyCase}/?case=${Number(case_id)}`,
    signal,
  };

  try {
    const privacyCaseResponse = await axiosInstance(options);
    console.log("Reached");
    return privacyCaseResponse;
  } catch (err) {
    return err;
  }
};

export {
  fetchCompanyPrivacyByName,
  fetchCompanyPrivacyService,
  fetchCompanyPrivacyCase,
};
