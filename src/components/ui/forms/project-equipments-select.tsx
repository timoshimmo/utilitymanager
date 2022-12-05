import SelectInput from "../select-input";
import Label from "../label";
import ValidationError from "../form-validation-error";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  error: string | undefined;
  compulsory?: boolean;
  data: any;
}

const ProjectEquipmentsSelect = ({ control, error, compulsory = false, data }: Props) => {

  return (
    <div className="w-full">
      <Label>Equipments{compulsory && <span className="text-sm text-[#EA0E0E]">*</span>}</Label>
      <SelectInput
        name="equipments"
        control={control}
        getOptionLabel={(option: any) => option.type}
        getOptionValue={(option: any) => option.id}
        options={data}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default ProjectEquipmentsSelect;
