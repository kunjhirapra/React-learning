import CabinCard from "@/app/_components/CabinCard";
import {getCabins} from "@/app/_lib/data-service";
import {CabinType} from "@/app/_lib/type";
// import {unstable_noStore} from "next/cache";

async function CabinList({filter}: {filter: string}) {
  // unstable_noStore();
  const rawCabins = await getCabins();
  const cabins: CabinType[] = rawCabins.map((cabin) => ({
    id: cabin.id,
    cabin_name: cabin.cabin_name,
    max_capacity: cabin.max_capacity,
    regular_price: cabin.regular_price,
    discount: cabin.discount,
    image: cabin.image,
    description: "",
    created_at: new Date().toISOString(),
  }));
  if (cabins.length <= 0 || !cabins) return;
  let displayedCabins = cabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.max_capacity >= 4 && cabin.max_capacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin: CabinType) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
