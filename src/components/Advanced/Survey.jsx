import { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import useForm from "./Hooks/useForm";
import useValidation from "./Hooks/useValidation";

const SurveyForm = () => {
  const initialState = {
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  };

  const categoryMapping = {
    17: "Health",
    18: "Technology",
    19: "Education",
  };

  const urlArray = [
    "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=boolean",
  ];

  const { formData, handleChange, resetForm } = useForm(initialState);
  const { errors, validate } = useValidation();
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const getQuestions = async () => {
    const cat = Object.keys(categoryMapping).find(
      (key) => categoryMapping[key] === formData.surveyTopic
    );
    const res = await axios.get("https://opentdb.com/api.php?", {
      params: {
        amount: 3,
        category: cat,
        difficulty: "easy",
        type: "boolean",
      },
    });
    console.log(res);
    if (res.data?.response_code === 0)
      setAdditionalQuestions(res.data?.results);
  };

  useEffect(() => {
    if (formData.surveyTopic) {
      getQuestions();
    }
  }, [formData.surveyTopic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
      resetForm();
      setAdditionalQuestions([]);
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
          Survey Topic:
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
          >
            <option value="">Select Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
        </label>
      </div>

      {formData.surveyTopic === "Technology" && (
        <>
          <div>
            <label>
              Favorite Programming Language:
              <select
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleChange}
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && (
                <span>{errors.favoriteProgrammingLanguage}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              Years of Experience:
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
              {errors.yearsOfExperience && (
                <span>{errors.yearsOfExperience}</span>
              )}
            </label>
          </div>
        </>
      )}

      {formData.surveyTopic === "Health" && (
        <>
          <div>
            <label>
              Exercise Frequency:
              <select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && (
                <span>{errors.exerciseFrequency}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              Diet Preference:
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
              >
                <option value="">Select Diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <span>{errors.dietPreference}</span>}
            </label>
          </div>
        </>
      )}

      {formData.surveyTopic === "Education" && (
        <>
          <div>
            <label>
              Highest Qualification:
              <select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor&apos;s</option>
                <option value="Master's">Master&apos;s</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && (
                <span>{errors.highestQualification}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              Field of Study:
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
              />
              {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
            </label>
          </div>
        </>
      )}

      {additionalQuestions.map((question, index) => (
        <div key={index}>
          <label>
            {he.decode(question.question)}
            <select name={`question${index}`} onChange={handleChange} required>
              <option value="">Select Option</option>
              {question.incorrect_answers.map((answer, i) => (
                <option key={i} value={answer}>
                  <p> {answer}</p>
                </option>
              ))}
              <option value={question.correct_answer}>
                {question.correct_answer}
              </option>
            </select>
          </label>
        </div>
      ))}

      <div>
        <label>
          Feedback:
          <textarea
            rows={5}
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          />
          {errors.feedback && <span>{errors.feedback}</span>}
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
