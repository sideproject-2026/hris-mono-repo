import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"


interface ButtonLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    textLoading?: string
    type?: "button" | "submit" | "reset"
    loading: boolean
    onClick?: () => void
    disabled?: boolean
    icon?: React.ReactNode
    
}

const ButtonLoading = ({ text, textLoading,type, loading, onClick,icon, disabled,className, ...props }: ButtonLoadingProps) => {
  return (
    <>
        <Button type={type} className={cn("flex items-center", className)} disabled={loading || disabled} onClick={onClick} {...props}>
            {loading ? <div className="flex items-center">
                <Spinner /> {textLoading ?? 'Loading...'}
            </div> : (
              <>
                {icon && icon}
                <span>{text}</span>
              </>
            )}
        </Button>
    </>
  )
}

export default ButtonLoading