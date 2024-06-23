import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = "Age must be a number greater than 0";
    }
    if (formData.attendingWithGuest === "Yes" && !formData.guestName) {
      newErrors.guestName = "Guest Name is required";
    }
    setErrors(newErrors);
    return newErrors;
  };

  return {
    errors,
    validate,
  };
};

export default useValidation;
