import React from "react";
import { Form } from "react-bootstrap";
import { uploadFile } from "../services/api";
import { FileUploadProps } from "../types/Map";
import { STRINGS } from "../utils/variables";

const FileUpload: React.FC<FileUploadProps> = ({ onDataUploaded }) => {
  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files;
    if (!file) {
      onDataUploaded([], STRINGS.MSG_NO_FILE_SELECTED);
      return;
    }

    if (file[0].type !== "application/json") {
      onDataUploaded([], STRINGS.MSG_FILE_TYPE);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("uploadFile", file[0]);

      // Call the service
      const mapData = await uploadFile(formData);
      // Save the data into the local storage
      localStorage.setItem("map_data", JSON.stringify(mapData));
      onDataUploaded(mapData);
    } catch (error) {
      const errorMessage = (error as Error).message || STRINGS.MSG_UNEXPECTED_ERROR;
      onDataUploaded([], errorMessage);
    }
  };

  return (
    <Form.Group className="mb-3 text-center w-100">
      <Form.Label className="btn btn-primary w-100">
        Upload File
        <Form.Control
          type="file"
          name="uploadFile"
          className="d-none"
          onChange={handleFileUpload}
        />
      </Form.Label>
    </Form.Group>
  );
};

export default FileUpload;
