import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Profile = () => {
  return (
    <Avatar className={`size-11`}>
      <AvatarImage src="/_.jpeg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
