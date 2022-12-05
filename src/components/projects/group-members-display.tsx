import Avatar from '../../components/ui/avatar';
import { avatarPlaceholder } from '../../lib/placeholders';

type membersProps = {
  members: any;
};

const MembersDisplay: React.FC<membersProps> = ({ members }) => {

  return (
    <div className="w-full flex mt-4 mb-6">
    {
      members.map((member: any, index: number) => (
        <div
        key={index}
        className="w-32">
          <Avatar
            src={avatarPlaceholder}
            title="team member"
            className="h-8 w-8 mx-auto"
          />
          <div className="mt-1 mx-auto">
              <h6 className="text-accent text-center text-xs font-semibold">{member.firstName}{" "}{member.lastName}</h6>
          </div>
        </div>
      ))
    }
    </div>
  );
}

export default MembersDisplay;
