import cn from 'classnames';
import moment from 'moment';

type TicketGroupProps = {
  ticket: any;
};


const MessageGroup: React.FC<TicketGroupProps> = ({ ticket }) => {

  return (
    <div className="w-full h-[75%] overflow-y-auto">
      {ticket.messages.map((msg: any, index: number) => (
        <div
        key={index}
        className={cn('w-full flex mt-6', msg.senderType > 0 && 'justify-end')}>
          <div className="w-2/3">
            <span className={cn('text-muted text-xs w-full block mb-2', msg.senderType > 0 && 'text-right')}>{moment(msg.dateCreated).utc().format('DD-MM-YYYY HH:mm:ss')}</span>
            <div
            className={cn('w-full p-3 md:p-4 bg-gray-100 shadow rounded',
                msg.senderType > 0 ? 'bg-[#79D2DE]/[.05]': 'bg-gray-100'
              )}
            >
              <span className='text-accent text-sm'>{msg.message}</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );

};

export default MessageGroup;
