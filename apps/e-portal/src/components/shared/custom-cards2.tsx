import { Button } from "../ui/button";


interface CustomCardProps {
    title: string
    totalCalculated: number
    icon: string
    bgColor?: string
    onClick?: () => void
    isFetching: boolean
}

export const CustomCard2 = ({ title, totalCalculated, icon,bgColor, onClick, isFetching }: CustomCardProps) => {
   return (
      <Button onClick={onClick} className={`flex flex-col gap-2 p-5 rounded-md text-card-foreground border-b-5 h-auto w-full items-start ${bgColor ? bgColor : "bg-card border-primary"}`}>
         <span className={"flex items-center justify-between gap-2 w-full"}>
            <p className={`text-lg font-sans ${isFetching ? 'animate-pulse bg-gray-200 h-2 w-full rounded-full' : ''}`}>{title}</p>
            <img src={icon} alt="icon" className="w-8 h-8" />
         </span>
         <p className={`text-4xl text-secondary-foreground mt-5 font-sans ${isFetching ? 'animate-pulse bg-gray-200 h-5 w-full rounded-full' : ''}`}>
            {totalCalculated}
         </p>
      </Button>
   );
};




export default CustomCard2;
