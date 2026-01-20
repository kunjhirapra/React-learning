"use client";
import {useReservationContext} from "@/app/_components/ReservationContext";
import {CabinType, SettingsTypes} from "@/app/_lib/type";
import {isWithinInterval} from "date-fns";
import {DateRange, DayPicker} from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  if (!range?.from || !range?.to) return false;

  const {from, to} = range;

  return datesArr.some((date) =>
    isWithinInterval(date, {
      start: from,
      end: to,
    })
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: SettingsTypes;
  bookedDates: Date[];
  cabin: CabinType;
}) {
  const {range, setRange, resetRange} = useReservationContext();
  // CHANGE
  const regularPrice = cabin.regular_price;
  const discount = cabin.discount;
  const numNights = cabin.max_capacity;
  const cabinPrice = regularPrice - discount;

  // SETTINGS
  const minBookingLength = settings.min_booking_length;
  const maxBookingLength = 500;
  // const maxBookingLength = settings.max_booking_length;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        styles={{
          months: {
            width: "30rem",
          },
          month: {
            color: "#fff",
          },
          day: {
            width: "32px",
            height: "32px",
            color: "#333",
          },

          day_button: {
            width: "30px",
            height: "30px",
            color: "#fff",
            borderRadius: "50%",
            fontWeight: "700",
            cursor: "pointer",
          },

          selected: {
            backgroundColor: "#c69963",
            color: "#fff",
          },
        }}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={{before: new Date()}}
        onSelect={setRange}
        selected={range}
        required
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
