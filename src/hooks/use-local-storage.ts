import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T){
   const [storedVal, setStoredVal] = useState<T>(() => {
    try{
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err){
      console.error(err)
      return initialValue;
    }
   });
   
   useEffect(() => {
    try{
      localStorage.setItem(key, JSON.stringify(storedVal))
    }catch(err){
      console.error(err)
    }
   }, [key, storedVal])

   return [storedVal, setStoredVal] as const;
}