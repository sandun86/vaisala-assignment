import { v4 as uuidv4 } from "uuid";

export const getAppUuid = (): string => {
    const appUuid = uuidv4();
    const storedUUID = localStorage.getItem("user_uuid") || appUuid;
  
    if (!localStorage.getItem("user_uuid")) {
      localStorage.setItem("user_uuid", appUuid);
    }
  
    return storedUUID;
  };
  