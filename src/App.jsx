import EventRegistration from "./components/Basic/EventRegistration";
import JobApplicationForm from "./components/Intermediate/JobApplication";

import styles from "./App.module.css";
import SurveyForm from "./components/Advanced/Survey";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.form_wrapper}>
        <h1>Event Registration Form</h1>
        <EventRegistration />
      </div>
      <div className={styles.form_wrapper}>
        <h1>Job Application Form</h1>
        <JobApplicationForm />
      </div>
      <div className={styles.form_wrapper}>
        <h1>Survey Form</h1>
        <SurveyForm />
      </div>
    </div>
  );
}

export default App;
