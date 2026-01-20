"use client";
import {ReservationContextType} from "@/app/_lib/type";
import {createContext, useContext, useState, type ReactNode} from "react";
import {DateRange} from "react-day-picker";

const ReservationContext = createContext<ReservationContextType | null>(null);
const initialState: DateRange = {from: undefined, to: undefined};
function ReservationContextProvider({children}: {children: ReactNode}) {
  const [range, setRange] = useState<DateRange>(initialState);
  const resetRange = () => {
    setRange(initialState);
  };
  return (
    <ReservationContext.Provider value={{range, setRange, resetRange}}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservationContext() {
  const value = useContext(ReservationContext);
  if (!value)
    throw new Error(
      "Used ReservationContext outside of Provider. The context can only be used in children of the Provider"
    );
  return value;
}

export {useReservationContext, ReservationContextProvider};
