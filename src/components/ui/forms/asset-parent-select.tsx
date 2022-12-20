import SelectInput from "../select-input";
import Label from "../label";
import ValidationError from "../form-validation-error";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  error: string | undefined;
  compulsory?: boolean;
  parents: any;
}

const AssetParentSelect = ({ control, error, compulsory = false, parents }: Props) => {

  return (
    <div className="mb-5">
      <Label>Asset Parent{compulsory && <span className="text-sm text-[#EA0E0E]">*</span>}</Label>
      <SelectInput
        name="assetParent"
        control={control}
        getOptionLabel={(option: any) => option.description}
        getOptionValue={(option: any) => option._id}
        options={parents}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default AssetParentSelect;
