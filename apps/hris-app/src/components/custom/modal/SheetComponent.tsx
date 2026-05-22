import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";


interface SheetComponentProps {
    title: string;
    description: string;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

export default function SheetComponent({ title, description, isOpen, setOpen, children }: SheetComponentProps) {
    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetContent className="sm:max-w-[500px] border-0">
                <SheetHeader>
                    <SheetTitle className="font-poppins text-lg text-medium dark:text-foreground text-foreground">{title}</SheetTitle>
                    <SheetDescription className="font-poppins text-sm text-medium dark:text-foreground text-foreground">{description}</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col w-full overflow-y-auto">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}