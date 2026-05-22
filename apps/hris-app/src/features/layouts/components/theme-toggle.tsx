import { Moon, Sun } from "iconsax-reactjs";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";


const ThemeToggle = () => {
   const {setTheme,theme } = useTheme();

   function handleToggle() {
      setTheme(theme === "dark" ? "light" : "dark");
   }

  return (
   <>
      {theme === "dark" ? (
         <Button onClick={handleToggle}>
            <Sun color="#FFFFFF" className="h-[1.2rem] w-[1.2rem]" />
         </Button>
      ) : (
         <Button onClick={handleToggle}>
            <Moon color="#FFFFFF" className="absolute h-[1.2rem] w-[1.2rem]" />
         </Button>
      )}
   </>
  )
}

export default ThemeToggle