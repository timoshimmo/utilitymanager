import cn from 'classnames';
import Avatar from '../../components/ui/avatar';
import { avatarPlaceholder } from '../../lib/placeholders';

type TicketCardProps = {
  ticket: any;
  isActive: boolean;
  onClick?: (e: any) => void;
};

const MessageCard: React.FC<TicketCardProps> = ({ onClick, ticket, isActive }) => {

  return (
      <li className="border-b-2 border-b-gray-100 py-3">
        <div
          onClick={onClick}
          role="button"
          className={cn(
            'rounded overflow-hidden w-full p-3 shrink-0 flex-col mb-4 border-2 border-transparent cursor-pointer last:mb-0 hover:bg-gray-100',
            isActive === true && 'bg-gray-100 !border-accent'
          )}
        >
         <div className="flex">
          <div className="w-1/5 flex">
            <Avatar
              src={avatarPlaceholder}
              title="user name"
              className="h-12 w-12"
            />
          </div>
          <div className="w-3/5">
              <h6 className="text-body text-lg font-semibold">{ticket.user.firstName}{" "}{ticket.user.lastName}</h6>
              <span className="text-muted text-xs my-1">{ticket.user.email}</span>
              <p className="text-body text-sm leading-tight my-2">{ticket.title}</p>
              <span className="text-muted text-xs leading-4 block">{ticket.description}</span>
          </div>

          <div className="w-1/5 flex-col">
            <div className="w-full flex justify-end h-[40%]">
              <span className="text-muted text-sm">now</span>
            </div>
            <div className="w-full flex justify-end h-[60%]">
              <span className="text-light bg-[#FF7D8F] text-sm h-7 w-7 rounded-full block flex items-center justify-center">
                {ticket.messages.length > 0 ? ticket.messages.length : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MessageCard;
