import { decode } from "./Crypto";
import { getCookie } from "./Utils";

export const isLoggedIn = async () => {
  const data = await getCookie("_ud");
  if (data) {
    const decodedData = await decode(data);
    if (JSON.parse(decodedData)?.email == "admin@gmail.com") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
