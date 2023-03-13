import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IBook } from "../model/IBook";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
 const [value, setValue] = useState<T>(() => {
   const jsonValue = localStorage.getItem(key)
  if(jsonValue) { 
    return JSON.parse(jsonValue)
  }
   if(typeof initialValue === "function") {
    return (initialValue as () => T)()
   } else {
    return initialValue
   }
 })
 
  
useEffect(() => {
  localStorage.setItem(key, JSON.stringify(value))
}, [key, value])

return [key, setValue] as [typeof key, typeof setValue]
}
