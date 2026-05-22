import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

interface HeaderComponentProps {
  profile?: UserProfileType | null;
}

const HeaderComponent = ({ profile }: HeaderComponentProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();

  // Determine greeting and aesthetic tokens based on time
  const theme = useMemo(() => {
    if (hour < 12) {
      return {
        greeting: "Good Morning",
        gradient: "from-[#FF9B63] via-[#FF7E33] to-[#FF9B63]",
        accent: "text-orange-50",
        image: "/morning.png",
        animation: "animate-pulse-slow",
      };
    } else if (hour < 18) {
      return {
        greeting: "Good Afternoon",
        gradient: "from-[#4FACFE] via-[#00F2FE] to-[#4FACFE]",
        accent: "text-blue-50",
        image: "/afternoon.png",
        animation: "animate-bounce-slow",
      };
    } else {
      return {
        greeting: "Good Evening",
        gradient: "from-[#1E3A8A] via-[#1E1B4B] to-[#1E3A8A]",
        accent: "text-indigo-100",
        image: "/evening.png",
        animation: "animate-float",
      };
    }
  }, [hour]);

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl p-8 shadow-2xl transition-all duration-1000 md:p-10 lg:h-[250px]",
        "bg-secondary",
        theme.gradient,
      )}
    >
      {/* Decorative Orbs */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-secondary blur-2xl" />

      <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-center">
        {/* Welcome Section */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-4xl font-sans uppercase">
              {theme.greeting},{" "}
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {profile?.firstName}
              </span>
              !
            </h1>
            <p
              className={cn(
                "max-w-xl text-sans font-medium leading-relaxed font-sans sm:text-md opacity-90",
                theme.accent,
              )}
            >
              Welcome back to your employee portal. Everything is up to date and
              ready for your review.
            </p>
          </div>
        </div>

        {/* Time & Visual Section */}
        <div className="flex w-full flex-col items-center gap-6 rounded-3xl bg-black/10 p-6 backdrop-blur-lg sm:flex-row sm:justify-between lg:w-auto lg:p-8">
          <div className="flex flex-col items-center gap-1 sm:items-end text-center sm:text-right">
            <div className="flex items-center gap-2 text-white/80">
              <CalendarIcon className="h-4 w-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-tighter font-sans sm:text-sm">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-white/60 sm:h-5 sm:w-5" />
              <h1 className="text-1xl font-black tabular-nums tracking-tighter text-white sm:text-4xl md:text-2xl font-sans">
                {now.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h1>
            </div>
          </div>

          <div className="hidden h-12 w-px bg-white/20 sm:block" />

          <div className={cn("relative shrink-0", theme.animation)}>
            <img
              src={theme.image}
              alt="Time of day icon"
              className="h-20 w-20 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] sm:h-24 sm:w-24 md:h-28 md:w-28"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
