import React, { useState } from "react";
import { generateWordDocument } from "../WordProcessor";

const StaticForm = ({ docFile }) => {
  const [formData, setFormData] = useState({
    NN: "",
    CANO: "",
    CName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked");
    await generateWordDocument(docFile, formData);
  };

  return (
    <div>
      <h2>Fill in the Details</h2>
      <form>
        <label>
          Application Form Number (NN):
          <input
            type="text"
            name="NN"
            value={formData.NN}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Consumer Account Number (CANO):
          <input
            type="text"
            name="CANO"
            value={formData.CANO}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Consumer Name (CName):
          <input
            type="text"
            name="CName"
            value={formData.CName}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>
          Generate Document
        </button>
      </form>
    </div>
  );
};

export default StaticForm;
