import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const generateWordDocument = async (docFile, formData) => {
  try {
    console.log("Starting document generation...");

    const response = await fetch(docFile);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    console.log("File fetched successfully:", docFile);

    const docArrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(docArrayBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    console.log("Form data passed to doc.render:", formData);
    doc.render({
      NN: formData.NN,
      CANO: formData.CANO,
      CName: formData.CName,
    });

    const updatedDoc = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(updatedDoc, "UpdatedDocument.docx");
    console.log("Document generated successfully!");
  } catch (error) {
    console.error("Error generating Word document:", error);

    if (error.name === "TemplateError") {
      console.error("Template Error Details:", error.properties);
      alert(
        `Template error: ${error.properties.explanation}. Please verify the placeholders in the Word template.`
      );
    } else {
      alert(`An unexpected error occurred: ${error.message}`);
    }
  }
};
