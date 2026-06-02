import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <header className="flex items-start gap-6">
      <Avatar className="size-32 shrink-0 mt-1">
        <AvatarImage src="/profile.jpg" alt="Agustín Bravo" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <div className="pt-5">
        <h1 className="font-medium text-4xl">Agustín Bravo</h1>
        <p className="mt-2 text-xl">Full-Stack Software Engineer</p>
        <p className="mt-2 font-mono text-sm">
          AI-Focused · Startup-Paced · Customer-Obsessed
        </p>
      </div>
    </header>
  );
}
