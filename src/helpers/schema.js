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

export const userRegisterSchema = (type, shopFlag) => {

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name."),
    district: yup.string(),
    tehsil: yup.string(),
    city: yup.string(),
    shopName:yup.string(),
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
    if (type === "seller" && shopFlag) {
    schema = schema.shape({
      shopName: yup.string().required("Please enter shop name."),
    });
  }
  return schema;
}

export const FruitsFormSchema = (flag) => {

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name."),
    pkgType: yup.string().typeError("Please select package type.").required("Please select package type."),
    weightUnit: yup.string().required("Please select weight unit."),
    pkgWeight: yup.string().required("Please enter package weight."),
    description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
    price: yup.string(),
    bidding: yup.string(),
    shelfLifeStart: yup.string(),
    shelfLifeEnd: yup.string(),
    availableFrom: yup.string(),
    addressId: yup.array(),
  });

  if (!flag) {
    schema = schema.shape({
      price: yup.string().required("Please enter price.").test(
        'is-positive',
        'Price must be a positive number',
        value => {
          if (!value) return false;
          const price = parseFloat(value);
          return price > 0;
        }
      ),
      bidding: yup.string().required("Please select bidding."),
      shelfLifeStart: yup.string().required("Please select shelf start date."),
      shelfLifeEnd: yup.string().required("Please select shelf end date."),
      availableFrom: yup.string().required("Please select available from."),
      addressId: yup.array()
      .min(1, 'Please select address.')
      .typeError('Please select address.').required('Please select address.')
    });
  }
  return schema;
}

export const FertilizersFormSchema = (flag) => {

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name."),
    brand: yup.string().required("Please enter brand name."),
    pkgWeight: yup.string().required("Please enter weight weight."),
    pkgType: yup.string().required("Please select package type."),
    weightUnit: yup.string().required("Please select weight unit."), 
    description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
    // subProductType: yup.string().required("Please enter sub product type."),
    areaCovered : yup.string().required("Please enter area covered ."),
    price: yup.string(),
    addressId: yup.array(),
    expiryDate: yup.string(),
  });

  if (!flag) {
    schema = schema.shape({
      price: yup.string().required("Please enter price.").test(
        'is-positive',
        'Price must be a positive number',
        value => {
          if (!value) return false;
          const price = parseFloat(value);
          return price > 0;
        }
      ),
      addressId: yup.array()
      .min(1, 'Please select address.')
      .typeError('Please select address.').required('Please select address.'),
      expiryDate : yup.string().required("Please select expiry date."),
    });
  }
  return schema;
}


export const SeedFormSchema = (flag) => {

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name."),
    brand: yup.string().required("Please enter brand."),
    pkgType: yup.string().required("Please select package type."),
    weightUnit: yup.string().required("Please select weight unit."),
    pkgWeight: yup.string().required("Please enter weight weight."),
    description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
    seedVariety: yup.string().required("Please enter seed variety."),
    seedType: yup.string().required("Please select seed type."),
    suitableRegion: yup.string().required("Please select region."),
    seedWeight: yup.string().required("Please enter seed weight."),
    price: yup.string(),
    addressId: yup.array(),
  });

  if (!flag) {
    schema = schema.shape({
      price: yup.string().required("Please enter price.").test(
        'is-positive',
        'Price must be a positive number',
        value => {
          if (!value) return false;
          const price = parseFloat(value);
          return price > 0;
        }
      ),
      addressId: yup.array()
      .min(1, 'Please select address.')
      .typeError('Please select address.').required('Please select address.')
    });
  }
  return schema;
}


export const MachinaryFormSchema = (type,flag) => {
  let schema = yup.object().shape({
    condition: yup.string(),
    model: yup.string(),
    price: yup.string(),
    addressId: yup.array(),
    description: yup.string().required("Please enter description.").max(500, "Description must be at most 500 characters long."),
    type: yup.string().required("Please enter product type."),
    name: yup.string().required("Please enter name.")
  });

  if(!flag){
    schema = schema.shape({
      price: yup.string().required("Please enter price.").test(
        'is-positive',
        'Price must be a positive number',
        value => {
          if (!value) return false;
          const price = parseFloat(value);
          return price > 0;
        }
      ),
      model: yup.string().required("Please enter modal."),
      addressId: yup.array()
      .min(1, 'Please select address.')
      .typeError('Please select address.').required('Please select address.')
    });
  }

  if (type === "Tool" || type === "Machinary") {
    schema = schema.shape({
      condition: yup
        .string()
        .required("Please select condition."),
    });
  }
  if (type !== "Machinary") {
    schema = schema.shape({
      horsePower: yup.string().nullable(),
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

export const updateAddLocationSchema = (flag) => {
  let schema = yup.object().shape({
    district: yup.string().required("Please enter district name."),
    tehsil: yup.string().required("Please enter tehsil name."),
    city: yup.string().required("Please enter city name."),
    address: yup.string().required("Please enter address."),
  });

  if (flag) {
    schema = schema.shape({
      shop: yup.string().required("Please enter shop name."),
    });
  } else {
    // If flag is false, allow 'shop' to be nullable
    schema = schema.shape({
      shop: yup.string().nullable(), // Allow shop to be nullable
    });
  }

  return schema;
}
