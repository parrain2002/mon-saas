// components/team/TeamMemberCard.tsx

interface TeamMember {
  id: string | number;
  email: string;
  role: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  onRemove: (id: string | number) => void;
}

export default function TeamMemberCard({ member, onRemove }: TeamMemberCardProps) {
  return (
    <div>
      <p>
        <strong>ID:</strong> {member.id} —{" "}
        <strong>Email:</strong> {member.email} —{" "}
        <strong>Role:</strong> {member.role}
      </p>
      <button onClick={() => onRemove(member.id)}>Remove</button>
    </div>
  );
}
