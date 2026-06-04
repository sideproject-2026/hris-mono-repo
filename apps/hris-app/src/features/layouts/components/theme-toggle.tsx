import { Moon, Sun } from "iconsax-reactjs";
import { useTheme, Button, ThemeProvider } from "@hris/shared-ui";


const ThemeToggleContent = () => {
   const { setTheme, theme } = useTheme();

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

const ThemeToggle = () => (
   <ThemeProvider defaultTheme="dark" storageKey="hris-theme-storage">
      <ThemeToggleContent />
   </ThemeProvider>
)

export default ThemeToggle