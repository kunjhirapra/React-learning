export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=046824b995514a50a77ead129d06046a`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  console.log(data);
  return data;
}
