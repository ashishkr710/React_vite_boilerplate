//import CryptoJS from "crypto-js";
//const REACT_APP_SECRET_KEY = "rqXL3cXOOpKlUeZ7dSP8QBuvbMHPVBxG"
// const REACT_APP_SECRET_KEY = "Fonemed@secret_Key91740"

const cipher = (salt: string) => {
  const textToChars = (text: string) =>
    text?.split("").map((c) => c?.charCodeAt(0));
  const byteHex = (n: string) => ("0" + Number(n)?.toString(16)).slice(-2);
  const applySaltToChar: any = (code: string) =>
    textToChars(salt)?.reduce((a: any, b: any) => a ^ b, code);
  return (text: string) =>
    text
      ?.split("")
      ?.map(textToChars)
      ?.map(applySaltToChar)
      ?.map(byteHex)
      ?.join("");
};
const decipher = (salt: string) => {
  const textToChars = (text: string) =>
    text?.split("")?.map((c) => c?.charCodeAt(0));
  const applySaltToChar: any = (code: string) =>
    textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
  return (encoded: string) =>
    encoded
      ?.match(/.{1,2}/g)
      ?.map((hex) => parseInt(hex, 16))
      ?.map(applySaltToChar)
      ?.map((charCode: any) => String.fromCharCode(charCode))
      ?.join("");
};
// To create a cipher
const encrypt = cipher("rqXL3cXOOpKlUeZ7dSP8QBuvbMHPVBxG");
const decrypt = decipher("rqXL3cXOOpKlUeZ7dSP8QBuvbMHPVBxG");

//Encrypt data
export const encryptData = (data: any) => {
  //console.log("Encrypt Data ==> ", encrypt);
  return encrypt(data);
  return data;
  //return CryptoJS.AES.encrypt(data, REACT_APP_SECRET_KEY)?.toString()
};

//Decrypt Data
export const decryptData = (data: any) => {
  //console.log("Decrypt Data ==> ", decrypt);
  return decrypt(data);
  return data;
  //return CryptoJS.AES.decrypt(data, REACT_APP_SECRET_KEY)?.toString(CryptoJS.enc.Utf8);
};
