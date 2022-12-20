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
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' },
];

const AdequatelySecuredSelect = ({ control, error, compulsory }: Props) => {

  return (
    <div className="mb-5">
      <Label>Adequately Secured{compulsory && <span className="text-sm text-[#EA0E0E]">*</span>}</Label>
      <SelectInput
        name="secured"
        control={control}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={data}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default AdequatelySecuredSelect;
