import { useEffect } from "react";
import SelectInput from "../select-input";
import Label from "../label";
import ValidationError from "../form-validation-error";
import { Control, useFormState, useWatch } from "react-hook-form";
import { useModalAction } from "../modal/modal.context";

interface Props {
  control: Control<any>;
  error: string | undefined;
  setValue: any;
  defaultVal: Number;
  id: string;
}

const data = [
  { value: 0, label: 'New' },
  { value: 1, label: 'Open' },
  { value: 2, label: 'Closed' }
];

const TicketStatusSelect = ({ control, error, setValue, defaultVal, id }: Props) => {

  const { openModal } = useModalAction();

  const status = useWatch({
    control,
    name: "ticketStatus",
  });

  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {

    if (defaultVal === 0) {
      setValue("ticketStatus", { value: 0, label: 'New' });
    }
    if (defaultVal === 1) {
      setValue("ticketStatus", { value: 1, label: 'Open' });
    }
    if (defaultVal === 2) {
      setValue("ticketStatus", { value: 2, label: 'Closed' });
    }

  }, [defaultVal]);

  useEffect(() => {
    if (status?.value !== defaultVal && dirtyFields?.ticketStatus) {
      const val = status?.value;
      openModal("UPDATE_STATUS", { id, val });
    }
  }, [status?.value]);

/*  function handleOpenUpdateStatus() {
    openModal("UPDATE_STATUS", { id, value });
  }*/

  return (
    <div className="w-full">
      <SelectInput
        name="ticketStatus"
        control={control}
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        options={data}
      />
      <ValidationError message={error} />
    </div>
  );
};

export default TicketStatusSelect;
