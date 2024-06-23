import useForm from "./Hooks/UseForm";
import useValidation from "./Hooks/UseValidation";

import styles from "./JobApplication.module.css";

const JobApplicationForm = () => {
  const initialState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  };

  const { formData, handleChange, resetForm } = useForm(initialState);
  const { errors, validate } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span>{errors.fullName}</span>}
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </label>
      </div>
      <div>
        <label>
          Applying for Position:
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </label>
      </div>
      {["Developer", "Designer"].includes(formData.position) && (
        <div>
          <label>
            Relevant Experience (years):
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
            />
            {errors.relevantExperience && (
              <span>{errors.relevantExperience}</span>
            )}
          </label>
        </div>
      )}
      {formData.position === "Designer" && (
        <div>
          <label>
            Portfolio URL:
            <input
              type="text"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
            />
            {errors.portfolioUrl && <span>{errors.portfolioUrl}</span>}
          </label>
        </div>
      )}
      {formData.position === "Manager" && (
        <div>
          <label>
            Management Experience:
            <input
              type="text"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && (
              <span>{errors.managementExperience}</span>
            )}
          </label>
        </div>
      )}
      <div>
        <label>
          Additional Skills:
          <div className={styles.add_skills_div}>
            <div className={styles.input_box}>
              <label>JavaScript</label>
              <input
                type="checkbox"
                name="JavaScript"
                checked={formData.additionalSkills.includes("JavaScript")}
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_box}>
              <label>CSS</label>
              <input
                type="checkbox"
                name="CSS"
                checked={formData.additionalSkills.includes("CSS")}
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_box}>
              <label>Python</label>
              <input
                type="checkbox"
                name="Python"
                checked={formData.additionalSkills.includes("Python")}
                onChange={handleChange}
              />
            </div>
          </div>
          {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
        </label>
      </div>
      <div>
        <label>
          Preferred Interview Time:
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={formData.preferredInterviewTime}
            onChange={handleChange}
          />
          {errors.preferredInterviewTime && (
            <span>{errors.preferredInterviewTime}</span>
          )}
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
