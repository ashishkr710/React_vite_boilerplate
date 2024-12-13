import * as Yup from "yup";

export const validationSchemaForEditAddress = Yup.object().shape({
  addresses: Yup.array().of(
    Yup.object().shape({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      zipCode: Yup.string()
        .required("Zip Code is required")
        .matches(/^\d+$/, "Zip Code must be a number"),
      addressTitle: Yup.string().required("Address Title is required"),
      phoneNumber: Yup.string()
        .min(8, "Minimum 8 numbers")
        .required("Phone Number is required"),
      faxNumber: Yup.string().min(8, "Minimum 8 numbers"),
    })
  ),
});
