import * as yup from "yup";

export const LoginSchema = (type) => {
  let schema = yup.object().shape({
    email: yup.string(),
    phone: yup.string(),
  });

  if (type === "company") {
    schema = schema.shape({
      email: yup
        .string()
        .email("😠 Please enter a valid email.")
        .required("😠 Please enter an email."),
    });
  } else if (type === "farmer" || type === "vendor") {
    schema = schema.shape({
      phone: yup
        .string()
        .required("😠 Please enter your phone.")
        .matches(
          /^\d{10}$/,
          "😠 Please enter your phone in the format: 3000000000"
        ),
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

export const userRegisterSchema = yup.object().shape({
  firstName: yup.string().required("Please enter first name."),
  lastName: yup.string().required("Please enter last name."),
});

export const FruitsFormSchema = yup.object().shape({
  name: yup.string().required("Please enter name."),
  pkgType: yup.object().required("Please select package type."),
  weightUnit: yup.object().required("Please select weight unit."),
  pkgWeight: yup.string().required("Please enter weight weight."),
  pkgQuantity: yup.string().required("Please enter package quantity."),
  price: yup.string().required("Please enter price."),
  bidding: yup.object().required("Please select bidding."),
  tax: yup.object().required("Please select tax."),
  shipping: yup.object().required("Please select shipping type."),
  shelfLifeStart: yup.string().required("Please select shelf start date."),
  shelfLifeEnd: yup.string().required("Please select shelf end date."),
  availableFrom: yup.string().required("Please select available from."),
  description: yup.string().required("Please enter description."),
});
