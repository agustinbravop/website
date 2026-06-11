import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profile } from "@/data";

export default function HeroSection() {
  return (
    <header className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
      <Avatar className="size-24 sm:size-32 shrink-0 sm:mt-1">
        <AvatarImage src="/profile.jpg" alt={profile.name} />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <div className="sm:pt-5">
        <h1 className="font-medium text-4xl">{profile.name}</h1>
        <p className="mt-2 text-xl">{profile.title}</p>
        <p className="mt-2 font-mono text-sm max-sm:text-xs">
          {profile.tagline}
        </p>
      </div>
    </header>
  );
}
