import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DialogComponentProps {
    title: string;
    description: string;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

export default function DialogComponent({ title, description, isOpen, setOpen, children }: DialogComponentProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[500px] border-0'>
        <DialogHeader>
          <DialogTitle className='font-poppins text-lg text-medium dark:text-foreground text-foreground'>{title}</DialogTitle>
          <DialogDescription className='font-poppins text-sm text-medium dark:text-foreground text-foreground'>
           {description}
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col'>
            {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
