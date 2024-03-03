import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^[0-9]{11}$/, "😠 Please enter a valid 11-digit phone number.")
    .transform(value => {
      // Remove any non-numeric characters from the phone number
      return value.replace(/\D/g, '');
    })
    .test('startsWithZeroThree', '😠 Phone number should start with "03"', value => {
      return value.startsWith('03');
    })
    .test('hasCorrectLength', '😠 Phone number should be 11 digits long', value => {
      return value.length === 11;
    })
    .required("😠 Please enter your phone."),
});

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

export const userRegisterSchema = (type) => {

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name."),
    district: yup.string(),
    tehsil: yup.string(),
    city: yup.string(),
    address: yup.string(),
  });

  if (type === "seller") {
    schema = schema.shape({
      district: yup.string().required("Please enter district name."),
      tehsil: yup.string().required("Please enter tehsil name."),
      city: yup.string().required("Please enter city name."),
      address: yup.string().required("Please enter address."),
    });
  }

  return schema;
}

export const FruitsFormSchema = yup.object().shape({
  name: yup.string().required("Please enter name."),
  pkgType: yup.string().typeError("Please select package type.").required("Please select package type."),
  weightUnit: yup.string().required("Please select weight unit."),
  pkgWeight: yup.string().required("Please enter package weight."),
  // pkgQuantity: yup.string().required("Please enter package quantity."),
  price: yup.string().required("Please enter price."),
  bidding: yup.string().required("Please select bidding."),
  // tax: yup.string().required("Please select tax."),
  // shipping: yup.string().required("Please select shipping type."),
  shelfLifeStart: yup.string().required("Please select shelf start date."),
  shelfLifeEnd: yup.string().required("Please select shelf end date."),
  availableFrom: yup.string().required("Please select available from."),
  description: yup.string().required("Please enter description."),
});

export const FertilizersFormSchema = yup.object().shape({
  name: yup.string().required("Please enter name."),
  brand: yup.string().required("Please enter brand name."),
  pkgWeight: yup.string().required("Please enter weight weight."),
  pkgType: yup.string().required("Please select package type."),
  weightUnit: yup.string().required("Please select weight unit."), 
  // pkgQuantity: yup.string().required("Please enter package quantity."),
  price: yup.string().required("Please enter price."),
  // tax: yup.string().required("Please select tax."),
  // shipping: yup.string().required("Please select shipping type."),
  description: yup.string().required("Please enter description."),
});

export const SeedFormSchema = yup.object().shape({
  brand: yup.string().required("Please enter brand."),
  // seed: yup.string().required("Please enter seed name."),
  seedVariety: yup.string().required("Please enter seed variety."),
  seedType: yup.string().required("Please select seed type."),
  suitableRegion: yup.string().required("Please select region."),
  seedWeight: yup.string().required("Please enter seed weight."),
  pkgType: yup.string().required("Please select package type."),
  weightUnit: yup.string().required("Please select weight unit."),
  pkgWeight: yup.string().required("Please enter weight weight."),
  // pkgQuantity: yup.string().required("Please enter package quantity."),
  price: yup.string().required("Please enter price."),
  // tax: yup.string().required("Please select tax."),
  // shipping: yup.string().required("Please select shipping type."),
  description: yup.string().required("Please enter description."),
});

export const MachinaryFormSchema = (type) => {
  let schema = yup.object().shape({
    condition: yup.string(),
    horsePower: yup.string(),
    description: yup.string().required("Please enter description."),
    type: yup.string().required("Please enter product type."),
    name: yup.string().required("Please enter name."),
    model: yup.string().required("Please enter modal."),
    price: yup.string().required("Please enter price."),
  });

  if (type === "Tool" || type === "Machinary") {
    schema = schema.shape({
      condition: yup
        .string()
        .required("Please select condition."),
    });
  }

  if (type === "Machinary") {
    schema = schema.shape({
      horsePower: yup
        .string()
        .required("Please enter horse power."),
    });
  }

  return schema;
};

export const productsCategorySchema = yup.object().shape({
  category: yup.string().required("😠 Please select category."),
});

export const BioUpdateSchema = yup.object().shape({
  name: yup.string().required("😠 Please enter name."),
  description: yup.string().required("😠 Please enter description."),
});

export const updateAddLocationSchema = yup.object().shape({
  district: yup.string().required("Please enter district name."),
  tehsil: yup.string().required("Please enter tehsil name."),
  city: yup.string().required("Please enter city name."),
  address: yup.string().required("Please enter address."),
});