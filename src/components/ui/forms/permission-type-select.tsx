import SelectInput from "../select-input";
import Label from "../label";
import ValidationError from "../form-validation-error";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  error: string | undefined;
}

const data = [
  { value: '7', label: 'Asset Manager' },
  { value: '8', label: 'Account Manager' },
  { value: '4', label: 'Customer Relations Manager' },
  { value: '3', label: 'Executive' },
  { value: '5', label: 'Project Manager' },
  { value: '6', label: 'Store Manager' }
];

const PermissionTypeSelect = ({ control, error }: Props) => {

  return (
    <div className="mb-5">
      <Label>Manager Type</Label>
      <SelectInput
        name="permission"
        control={control}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={data}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default PermissionTypeSelect;
