import { useTheme } from "@/context/theme-provider"
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom"

function Header() {

  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to='/' className={`${isDark ? 'text-white' : 'text-blue-600'}`}>
          Stratus
        </Link>

        <div>
          <div onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}  
          >
            {
              isDark ? (
                <Sun className="h-6 w-6"/>
              ) 
              : (
                <Moon className="h-6 w-6"/>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header