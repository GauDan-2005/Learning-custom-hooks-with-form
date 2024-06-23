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

    // Survey Topic validation
    if (!values.surveyTopic) {
      errors.surveyTopic = "Survey Topic is required";
    }

    // Section specific validation
    if (values.surveyTopic === "Technology") {
      if (!values.favoriteProgrammingLanguage) {
        errors.favoriteProgrammingLanguage =
          "Favorite Programming Language is required";
      }
      if (!values.yearsOfExperience || values.yearsOfExperience <= 0) {
        errors.yearsOfExperience = "Years of Experience must be greater than 0";
      }
    }

    if (values.surveyTopic === "Health") {
      if (!values.exerciseFrequency) {
        errors.exerciseFrequency = "Exercise Frequency is required";
      }
      if (!values.dietPreference) {
        errors.dietPreference = "Diet Preference is required";
      }
    }

    if (values.surveyTopic === "Education") {
      if (!values.highestQualification) {
        errors.highestQualification = "Highest Qualification is required";
      }
      if (!values.fieldOfStudy.trim()) {
        errors.fieldOfStudy = "Field of Study is required";
      }
    }

    // Feedback validation
    if (!values.feedback || values.feedback.length < 20) {
      errors.feedback = "Feedback must be at least 20 characters";
    }

    setErrors(errors);
    return errors;
  };

  return { errors, validate };
};

export default useValidation;
