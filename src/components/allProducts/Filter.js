import React from "react";
import FormInput from "components/common/base/FormInput";
import SelectInput from "components/common/base/SelectInput";
import { Button } from "components/common/base/button";
import { category } from "helpers/constant";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { productsCategorySchema } from "helpers/schema";
import {useWindowSize} from 'react-use';

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
  const {width} = useWindowSize()

  const { allProductLoader, productWithCategoryLoader } = useSelector(
    (state) => state.products
  );

  return (
    <form onSubmit={handleSubmit(handleGetCategoryPro)}>
    <div className="p-3 bg-white shadow-dashboard rounded-xl grid grid-cols-6 gap-3 items-center">
      <div className="2x:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6 xs:col-span-6">
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
      <div className="2x:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-6 sm:col-span-6 xs:col-span-6 flex justify-between">
        <Button
          value="Search"
          width={width > 420 ? 150 :120}
          height={45}
          loader={productWithCategoryLoader}
          disabled={allProductLoader || productWithCategoryLoader}
          type="submit"
        />
        <Button
          value="All Product"
          width={width > 420 ? 150 :120}
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
