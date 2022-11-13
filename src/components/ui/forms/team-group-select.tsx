import SelectInput from "../select-input";
import Label from "../label";
import ValidationError from "../form-validation-error";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  error: string | undefined;
  compulsory?: boolean;
  groups?: any;
}

const TeamGroupSelect = ({ groups, control, error, compulsory = false }: Props) => {

  return (
    <div className="mb-5">
      <Label>Team Groups{compulsory && <span className="text-sm text-[#EA0E0E]">*</span>}</Label>
      <SelectInput
        name="teamGroup"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option._id}
        options={groups}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default TeamGroupSelect;
