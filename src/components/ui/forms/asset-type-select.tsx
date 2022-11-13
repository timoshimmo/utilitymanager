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
  { value: 'Transformer', label: 'Transformer' },
  { value: 'Meter', label: 'Meter' },
  { value: 'Pole', label: 'Pole' },
];

const AssetTypeSelect = ({ control, error, compulsory = false }: Props) => {

  return (
    <div className="mb-5">
      <Label>Asset Type{compulsory && <span className="text-sm text-[#EA0E0E]">*</span>}</Label>
      <SelectInput
        name="assetType"
        control={control}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={data}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default AssetTypeSelect;
