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
  { value: 'abuja-central', label: 'Central Abuja Sub-Station' },
  { value: 'abuja-south', label: 'Abuja-South Sub-Station' },
  { value: 'abuja-east', label: 'Abuja East Sub-Station' },
  { value: 'abuja-west', label: 'Abuja West Sub-Station' },
];

const AssetParentSelect = ({ control, error, compulsory = false }: Props) => {

  return (
    <div className="mb-5">
      <Label>Asset Parent{compulsory && <span className="text-sm text-[#EA0E0E]">*</span>}</Label>
      <SelectInput
        name="assetParent"
        control={control}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={data}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default AssetParentSelect;
