import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MEMBERS_DATA } from "../types/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";

const MemberList = () => {
  return (
    <Card className="h-full border-none shadow-sm bg-gradient-to-b from-white to-gray-50/50 dark:from-slate-950 dark:to-slate-900/50">
      <CardHeader>
        <CardTitle className="text-secondary font-sans">Members</CardTitle>
        <CardDescription className="text-xs">
          Manage and view all team members.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="px-6">
          <div className="space-y-1 pb-4">
            {MEMBERS_DATA.map((member) => (
              <div
                key={member.id}
                className="group relative flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all duration-300"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                    <AvatarImage src={member.photo} className="object-cover" />
                    <AvatarFallback className="bg-primary/5 text-primary">
                      <UserCircle className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-primary transition-colors">
                    {member.fullName}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 font-medium uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {member.designation}
                    </Badge>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MemberList;
