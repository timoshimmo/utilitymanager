import SelectInput from "../select-input";
import Label from "../label";
import ValidationError from "../form-validation-error";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  error: string | undefined;
  compulsory?: boolean;
}

const data = [
  { value: 0, label: 'Very Good' },
  { value: 1, label: 'Good' },
  { value: 2, label: 'Operational' },
  { value: 3, label: 'Poor' },
  { value: 4, label: 'Damaged' },
];

const AssetStatusSelect = ({ control, error, compulsory }: Props) => {

  return (
    <div className="mb-5">
      <Label>Asset Status{compulsory && <span className="text-sm text-[#EA0E0E]">*</span>}</Label>
      <SelectInput
        name="status"
        control={control}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={data}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default AssetStatusSelect;
