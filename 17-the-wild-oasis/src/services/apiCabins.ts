import type {newCabinType} from "../types";
import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {
  let {data, error} = await supabase.from("cabins").select("*");
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin: newCabinType, id?: string) {
  const hasImgPath = newCabin.image?.toString().startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // https://lepylsjhnunubdvfukbi.supabase.co/storage/v1/object/public/cabin-image/cabin-001.jpg
  const imagePath = hasImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;

  let query = supabase.from("cabins");

  // CREATE
  if (!id) query.insert([{...newCabin, image: imagePath}]);

  // EDIT
  if (id) query.update({...newCabin, image: imagePath}).eq("id", id);

  const {data, error} = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created");
  }

  // upload image
  const {error: storageError} = await supabase.storage
    .from("cabin-image")
    .upload(imageName, newCabin.image, {contentType: newCabin.image.type});

  // Delete the cabin. If there was an error uploading images.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error("Cabin could not be Uploaded and bucket not created");
  }

  return data;
}

export async function deleteCabin(id: number): Promise<{id: number}[]> {
  const {data, error} = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data ?? [];
}
