import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NoteAdd } from "iconsax-reactjs";
import { ChevronDown } from "lucide-react";
import {
  getDialogType,
  getRequestFormText,
  REQUEST_FORMS,
} from "../types/constant";
import { useState } from "react";


const MenuButtonComponent = () => {
  const [_, setOpenDialog] = useState<string | null>(null);

  const handleDialogOpen = (type: string) => {
    setOpenDialog(type);
    console.log(type);
  };

  

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary text-white rounded h-11">
            <NoteAdd size={24} variant={"Bold"} className="bg-primary" />
            <span className="ml-2 font-sans text-sm">Create Request</span>
            <ChevronDown className="stroke-2 stroke-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-secondary mt-1" align="end">
          <DropdownMenuGroup>
            {REQUEST_FORMS.map((form) => {
              const dialogType = getDialogType(form.text);
              return (
                <DropdownMenuItem key={form.value || form.text} asChild>
                  <Button
                    variant={"ghost"}
                    className="font-sans text-white w-full flex justify-start hover:bg-primary! hover:text-white! h-11"
                    onClick={() => handleDialogOpen(dialogType)}
                  >
                    <NoteAdd size={24} variant={"Bold"} color="#fff" />
                    {getRequestFormText(form.text)}
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MenuButtonComponent;
