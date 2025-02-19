import axios from "axios";
import { getAppUuid } from "../utils/appUuid";
import { API_BASE_URL, API_KEY, STRINGS } from "../utils/variables";

/**
 * API call to upload file
 * @param formData 
 * @returns 
 */
export const uploadFile = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/file/upload`,
      formData,
      {
        headers: { "x-api-key": API_KEY, uuid: getAppUuid() },
      }
    );

    return response.data.data; 
  } catch (error) {
    console.error("Error uploading file:", extractErrorMessage(error));
    throw new Error(extractErrorMessage(error));
  }
};


// extract the error messages
const extractErrorMessage = (error: any): string => {
  return error.response?.data?.message || STRINGS.MSG_UNEXPECTED_ERROR;
};