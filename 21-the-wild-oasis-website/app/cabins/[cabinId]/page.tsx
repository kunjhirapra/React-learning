import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import {getCabins} from "@/app/_lib/data-service";
import supabase from "@/app/_lib/supabase";
import {CabinType} from "@/app/_lib/type";
import {EyeSlashIcon, MapPinIcon, UsersIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {notFound} from "next/navigation";
import {Suspense} from "react";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{cabinId: string}>;
}) {
  const {cabinId} = await params;
  const {cabin_name} = await getCabin(Number(cabinId));

  return {title: `Cabin ${cabin_name}`};
}
export async function getCabin(id: number) {
  const {data, error} = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 3000));
  if (error) {
    notFound();
  }

  return data;
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({cabinId: String(cabin.id)}));

  return ids;
}

export default async function Page({
  params,
}: {
  params: Promise<{cabinId: string}>;
}) {
  const {cabinId} = await params;
  const cabin = await getCabin(Number(cabinId));

  const {
    id,
    cabin_name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  }: CabinType = cabin;
  const imagePath =
    typeof image === "string" ? image : URL.createObjectURL(image);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative -translate-x-7 flex-1">
          <Image
            src={imagePath}
            fill
            alt={`Cabin ${cabin_name}`}
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 -translate-x-63.5 bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {cabin_name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{max_capacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin_name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
