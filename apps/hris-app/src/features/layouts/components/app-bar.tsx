import { MenuIcon } from 'lucide-react'
import { Button } from '@hris/shared-ui'

const AppBar = () => {
  return (
    <div className="w-full fixed z-5 dark:bg-slate-300 top-0 h-16 flex items-center justify-between shadow-md dark:text-black px-4">
      <Button variant="ghost">
        <MenuIcon className="size-4" />
      </Button>
    </div>
  )
}

export default AppBar
