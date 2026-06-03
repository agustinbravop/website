import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <header className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
      <Avatar className="size-24 sm:size-32 shrink-0 sm:mt-1">
        <AvatarImage src="/profile.jpg" alt="Agustín Bravo" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <div className="sm:pt-5">
        <h1 className="font-medium text-4xl">Agustín Bravo</h1>
        <p className="mt-2 text-xl">Full-Stack Software Engineer</p>
        <p className="mt-2 font-mono text-sm">
          AI-Focused · Startup-Paced · Customer-Obsessed
        </p>
      </div>
    </header>
  );
}
