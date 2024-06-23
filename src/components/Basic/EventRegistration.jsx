import React from "react";
import useForm from "./CustomHooks/UseForm";
import useValidation from "./CustomHooks/UseValidation";

import "./EventRegistration.module.css";

const EventRegistrationForm = () => {
  const initialState = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "No",
    guestName: "",
  };

  const { formData, handleChange, resetForm } = useForm(initialState);
  const { errors, validate } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
      alert(JSON.stringify(formData, null, 2));
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
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
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span>{errors.age}</span>}
        </label>
      </div>
      <div>
        <label>
          Are you attending with a guest?
          <select
            name="attendingWithGuest"
            value={formData.attendingWithGuest}
            onChange={handleChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>
      </div>
      {formData.attendingWithGuest === "Yes" && (
        <div>
          <label>
            Guest Name:
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
            />
            {errors.guestName && <span>{errors.guestName}</span>}
          </label>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventRegistrationForm;
