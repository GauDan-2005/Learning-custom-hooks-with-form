import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let errors = {};

    // Full Name validation
    if (!values.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }

    // Email validation
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    // Phone Number validation
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone Number is invalid";
    }

    // Relevant Experience validation
    if (
      (values.position === "Developer" || values.position === "Designer") &&
      (!values.relevantExperience || values.relevantExperience <= 0)
    ) {
      errors.relevantExperience =
        "Relevant Experience is required and must be greater than 0";
    }

    // Portfolio URL validation
    if (values.position === "Designer" && !values.portfolioUrl) {
      errors.portfolioUrl = "Portfolio URL is required";
    } else if (
      values.position === "Designer" &&
      values.portfolioUrl &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioUrl)
    ) {
      errors.portfolioUrl = "Portfolio URL is invalid";
    }

    // Management Experience validation
    if (values.position === "Manager" && !values.managementExperience) {
      errors.managementExperience = "Management Experience is required";
    }

    // Additional Skills validation
    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = "At least one skill must be selected";
    }

    // Preferred Interview Time validation
    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = "Preferred Interview Time is required";
    } else {
      const selectedDate = new Date(values.preferredInterviewTime);
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        errors.preferredInterviewTime =
          "Preferred Interview Time must be in the future";
      }
    }

    setErrors(errors);
    return errors;
  };

  return { errors, validate };
};

export default useValidation;
