import * as yup from "yup";

export const LoginSchema = (type) => {
  let schema = yup.object().shape({
    email: yup.string(),
    phone: yup.string(),
  });

  if (type === "company") {
    schema = schema.shape({
      email: yup.string().email("😠 Please enter a valid email.").required("😠 Please enter an email."),
    });
  } else if (type === "farmer" || type === "vendor") {
    schema = schema.shape({
      phone: yup.string().required("😠 Please enter your phone.").matches(/^\d{10}$/, "😠 Please enter your phone in the format: 3000000000"),
    });
  }

  return schema;
};



export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .typeError("OTP must be a number")
    .required("Please enter the OTP.")
    .test("four-digits", "Field must be a 4-digit number", (value) => {
      if (!value) return true;
      return String(value).length === 4;
    }),
});
