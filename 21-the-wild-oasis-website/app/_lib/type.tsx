import {DateRange} from "react-day-picker";

export interface CabinType {
  id: number | null;
  created_at: string;
  cabin_name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string | File;
}
export interface UpdateCabinType {
  cabin_name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string | File;
}
export interface CabinFormData {
  cabin_name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: FileList;
}
export interface SettingsTypes {
  id: number;
  created_at: string;
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}
export interface BookingType {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  total_price: number;
  status: string;
  guest_id: number;
  cabins: {cabin_name: string; image: string};
}

export type ReservationContextType = {
  range: DateRange;
  setRange: React.Dispatch<React.SetStateAction<DateRange>>;
  resetRange: () => void;
};
