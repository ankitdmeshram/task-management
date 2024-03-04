import CryptoJS from "crypto-js";
const secretKey = "chaheKoiMujheJungleeKahe";

export async function encode(plainText) {
  try {
    const cipherText = await CryptoJS.AES.encrypt(
      plainText,
      secretKey
    ).toString();
    return cipherText;
  } catch (error) {
    console.error("Error while encoding:", error);
    return { success: false, message: "Error while encoding", error };
  }
}

export async function decode(cipherText) {
  try {
    const plainText = await CryptoJS.AES.decrypt(
      cipherText,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return await plainText;
  } catch (error) {
    console.error("Error while decoding:", error);
    return { success: false, message: "Error while decoding", error };
  }
}
