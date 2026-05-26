import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { cn } from '../../lib/utils'

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  textLoading?: string
  type?: 'button' | 'submit' | 'reset'
  loading: boolean
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  icon?: React.ReactNode
  variant: 'default' | 'outline' | 'ghost' | 'link'
}

const ButtonLoading = ({
  text,
  textLoading,
  type,
  loading,
  onClick,
  icon,
  disabled,
  className,
  variant,
  ...props
}: ButtonLoadingProps) => {
  return (
    <>
      <Button
        type={type}
        variant={variant}
        className={cn('flex items-center', className)}
        disabled={loading || disabled}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          <div className="flex items-center">
            <Spinner /> {textLoading ?? 'Loading...'}
          </div>
        ) : (
          <>
            {icon && icon}
            <span className="font-normal uppercase">{text}</span>
          </>
        )}
      </Button>
    </>
  )
}

export default ButtonLoading
