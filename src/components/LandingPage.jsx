import React, { useState } from "react";
import StaticForm from "./StaticForm";

const LandingPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const docOptions = [
    { id: 1, name: "Test Document", file: "/docs/Test.docx" },
  ];

  return (
    <div>
      <h1>Word Document Editor</h1>
      <select onChange={(e) => setSelectedDoc(e.target.value)}>
        <option value="">--Select a Document--</option>
        {docOptions.map((doc) => (
          <option key={doc.id} value={doc.file}>
            {doc.name}
          </option>
        ))}
      </select>
      {selectedDoc && <StaticForm docFile={selectedDoc} />}
    </div>
  );
};

export default LandingPage;
