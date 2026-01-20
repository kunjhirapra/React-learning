import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";

import {useForm} from "react-hook-form";
import {createEditCabin} from "../../services/apiCabins";
import type {CabinFormData, newCabinType} from "../../types";

function CreateCabinForm({editCabin = {}}: {editCabin?: newCabinType | {}}) {
  const {id: editId, ...editValues} = editCabin as Partial<newCabinType>;
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} =
    useForm<CabinFormData>({
      defaultValues: isEditSession
        ? (editValues as Partial<CabinFormData>)
        : {},
    });

  const {errors} = formState;

  console.log(errors);

  const queryClient = useQueryClient();

  const {mutate: createCabin, status: isCreating} = useMutation({
    mutationFn: (data: newCabinType) => createEditCabin(data),
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
  });

  const {mutate: editCabin, status: isEditing} = useMutation({
    mutationFn: (data: newCabinType, id: string) =>
      createEditCabin(data, editId?.toString()),
    onSuccess: () => {
      toast.success("Cabin edited successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
  });

  function onSubmit(data: any) {
    console.log(data);
    mutate({...data, image: data.image[0]});
  }
  function onError() {
    // function onError(data: any) {
    // console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors.cabin_name?.message?.toString()}>
        <Input
          type="text"
          id="cabin_name"
          disabled={isCreating}
          {...register("cabin_name", {required: "This field is required"})}
        />
      </FormRow>
      <FormRow
        label="Maximum capacity"
        error={errors.max_capacity?.message?.toString()}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
          {...register("max_capacity", {required: "This field is required"})}
        />
      </FormRow>
      <FormRow
        label="Regular price"
        error={errors.regular_price?.message?.toString()}>
        <Input
          type="number"
          id="regular_price"
          disabled={isCreating}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors.discount?.message?.toString()}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
            validate: (value) => {
              const regularPrice = Number(getValues("regular_price"));
              const discount = Number(value);

              if (!regularPrice || !discount) return true;

              return (
                discount < regularPrice ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors.description?.message?.toString()}>
        <Textarea
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={status === "pending"}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
