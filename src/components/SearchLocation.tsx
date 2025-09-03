import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { Clock, Loader2, Search, XCircle } from "lucide-react"
import { useLocationSearchQuery } from "@/hooks/use-query"
import { useNavigate } from "react-router-dom"
import { useSearchHistory } from "@/hooks/use-search-history"
import { format } from "date-fns"


const SearchLocation = () => {

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearchQuery(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === 'K' && (e.metaKey || e.ctrlKey) && e.shiftKey)) {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', down, true)
    return () => document.removeEventListener('keydown', down, true);
  }, [])

  const handleSelect = (data: string) => {
    const [lat, lon, name, country] = data.split('|')

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country
    })

    setOpen(false)
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
  };

  return (
    <>

      <Button 
        variant='outline'
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}>
        <Search className="w-4 h-4 mr-2" />  
        Search cities ...
        <kbd className="pointer-events-none select-none ml-auto text-xs self-end">
          <span className="border px-1 bg-secondary rounded tracking-normal">Ctrl</span> <span className="border px-1 bg-secondary rounded">K</span>
        </kbd>
      </Button>

      

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
          className="pl-2"
        />
        <CommandList
          className="scrollbar scrollbar-track-transparent dark:scrollbar-thumb-accent scrollbar-thumb-muted-foreground"
        > 
          {
            query.length > 2 && !isLoading && 
            <CommandEmpty>No results found.</CommandEmpty>
          }
          <CommandGroup heading='Favorites'>
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>


          {
            history.length > 0 && 
            <>
              <CommandSeparator />  
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">Recent Searches</p>
                  <Button variant='ghost' size='sm' onClick={() => clearHistory.mutate()}>
                    <XCircle className="w-4 h-4"/>
                  </Button>
                </div>

                {
                  history.map(l =>{
                    return (
                      <CommandItem 
                        key={`${l.lat}-${l.lon}`}
                        value={`${l.lat}|${l.lon}|${l.name}|${l.country}`}
                        onSelect={handleSelect}
                      > 
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground"/>
                        <span>
                          {l.name},
                        </span>
                        {
                          l.state && 
                          <span className="text-sm text-muted-foreground">{l.state},</span>
                        }
                        <span className="text-sm text-muted-foreground">
                          {l.country}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {format(l.searchedAt, 'MMM d, h:mm a')}
                        </span>
                      </CommandItem>
                    )
                    
                  } )
                }
              </CommandGroup>
            </>

          }

          <CommandSeparator />

          {
            locations && locations.length > 0 && 
            <CommandGroup heading='Suggestions'>
              {
                isLoading && 
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              }
              {
                locations.map(l => (
                  <CommandItem 
                    key={`${l.lat}-${l.lon}`}
                    value={`${l.lat}|${l.lon}|${l.name}|${l.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4"/>
                    <span>
                      {l.name},
                    </span>
                    {
                      l.state && 
                      <span className="text-sm text-muted-foreground">{l.state},</span>
                    }
                    <span className="text-sm text-muted-foreground">
                      {l.country}
                    </span>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          }
            

        </CommandList>
      </CommandDialog>

    </>
  )
}

export default SearchLocation