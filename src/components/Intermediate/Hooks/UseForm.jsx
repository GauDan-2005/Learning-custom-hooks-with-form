import { useState } from "react";

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => {
      if (type === "checkbox") {
        if (checked) {
          return {
            ...prevFormData,
            additionalSkills: [...prevFormData.additionalSkills, name],
          };
        } else {
          return {
            ...prevFormData,
            additionalSkills: prevFormData.additionalSkills.filter(
              (skill) => skill !== name
            ),
          };
        }
      } else {
        return {
          ...prevFormData,
          [name]: val,
        };
      }
    });
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleChange,
    resetForm,
  };
};

export default useForm;
