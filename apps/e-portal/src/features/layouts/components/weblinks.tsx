import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRight, Global } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { WEB_LINKS } from "../constants/sidebarItems";

const Weblinks = () => {
  const handleSelectTransaction = (links: any) => {
    window.open(links, "_blank");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon-sm"}>
          <Global variant="Bold" size={24} className="text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit border-none">
        <PopoverHeader>
          <PopoverTitle className="uppercase font-sans font-bold">
            Weblinks
          </PopoverTitle>
          <PopoverDescription>
            Click on the links below to navigate to the respective websites.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid grid-cols-1 overflow-y-auto max-h-[300px] pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {WEB_LINKS?.map((links) => (
            <div
              key={links.name}
              className={cn(
                "mt-2 group relative flex items-center justify-between p-3 rounded-md transition-all duration-500 cursor-pointer overflow-hidden border-gray-300",
                "bg-white border hover:border hover:shadow-sky-500/10 hover:translate-y-[-4px]",
              )}
              onClick={() => handleSelectTransaction(links.url)}
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-50/0 via-sky-50/50 to-sky-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out" />

              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                  <Global size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                    {links.name}
                  </h4>
                  <p className="text-xs font-normal text-muted-foreground">
                    {links.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                <div className="p-2 bg-sky-500 text-white rounded-full">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Weblinks;
