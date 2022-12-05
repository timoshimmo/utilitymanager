import cn from 'classnames';
import Avatar from '../../components/ui/avatar';
import { avatarPlaceholder } from '../../lib/placeholders';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TicketStatusSelect from '../ui/forms/ticket-status-select';

type TicketUserTopProps = {
  ticket: any;
};

type FormValues = {
  ticketStatus: any;
}

const ticketStatusSchema = yup.object().shape({
  ticketStatus: yup.object().required('Ticket status must be selected'),
});

const defaultValues = {
  ticketStatus: -1
};

const MessageUserTop: React.FC<TicketUserTopProps> = ({ ticket }) => {

  const {
    control,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(ticketStatusSchema),
  });

  return (
    <div className="w-full flex">
      <div className="w-1/5 flex">
        <Avatar
          src={avatarPlaceholder}
          title="user name"
          className="h-16 w-16"
        />
      </div>
      <div className="w-3/5">
          <h6 className="text-body text-lg font-semibold">{ticket.user.firstName}{" "}{ticket.user.lastName}</h6>
          <span className="text-muted text-xs my-1">{ticket.user.email}</span>
      </div>
      <div className="w-1/5 flex-col">
        <TicketStatusSelect
        control={control}
        error={(errors?.ticketStatus as any)?.message}
        setValue={setValue}
        defaultVal={ticket.status}
        id={ticket.id}
        />
      </div>
    </div>
  );
}

export default MessageUserTop;
