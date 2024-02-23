import React from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import { Button } from "components/common/base/button";
import { category } from "helpers/constant";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { productsCategorySchema } from "helpers/schema";

const Filter = ({ handleGetCategoryPro, handleGetAllPro }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productsCategorySchema),
    // defaultValues,
  });

  const { allProductLoader, productWithCategoryLoader } = useSelector(
    (state) => state.products
  );

  return (
    <form onSubmit={handleSubmit(handleGetCategoryPro)}>
    <div className="p-3 bg-white shadow-dashboard rounded-xl grid grid-cols-6 gap-3 items-center">
      <div className="col-span-4">
      <Controller
            name="category"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <SelectInput
              {...register("category")}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                options={category}
                placeholder="Select category Type"
                value={field.value}
                error={errors?.category && errors.category.message}
              />
            )}
          />
      </div>
      <div className="col-span-2 flex justify-between">
        <Button
          value="Search"
          width={150}
          height={45}
          loader={productWithCategoryLoader}
          disabled={allProductLoader || productWithCategoryLoader}
          type="submit"
        />
        <Button
          value="All Product"
          width={150}
          height={45}
          onClick={handleGetAllPro}
          loader={allProductLoader}
          disabled={allProductLoader || productWithCategoryLoader}
        />
      </div>
    </div>
    </form>
  );
};

export default Filter;
