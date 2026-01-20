import {getBookedDatesByCabinId} from "@/app/_lib/data-service";
import {getCabin} from "@/app/cabins/[cabinId]/page";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{cabinId: string}>;
  }
) {
  const {cabinId} = await params;
  const cabinIdNum = Number(cabinId);
  if (isNaN(cabinIdNum)) {
    return Response.json({message: "Invalid cabinId"}, {status: 400});
  }
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinIdNum),
      getBookedDatesByCabinId(cabinIdNum),
    ]);

    return Response.json({cabin, bookedDates});
  } catch (error) {
    return Response.json({message: "Cabin not found!!"});
  }
}
