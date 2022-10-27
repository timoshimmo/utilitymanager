import Select from "./select/select";
import { Controller } from "react-hook-form";

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  [key: string]: any;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          options={options}
        />
      )}
    />
  );
};

export default SelectInput;
