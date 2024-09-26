"use server";
import { revalidatePath } from "next/cache";
import UserModel from "./models/users.model";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import userValidationSchema from "../api/users/schema";

export async function createUser(formData) {
  try {
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };
 
    const validation = userValidationSchema.safeParse(user)
    console.log(validation);
    
    if (!validation.success) {
      console.log({ message:validation.error.errors})
    } else {

        const createdUser = await UserModel.create(user);
        revalidatePath("/users");
        redirect("/users");
    }

  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
  }
}

export async function deleteUser(formData) {
  try {
    const id = formData.get("id");
    await UserModel.findByIdAndDelete(id);
    revalidatePath("/users");
    redirect("/users");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
  }
}

export async function updateUser(formData) {
  try {
    const id = formData.get("id");

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };

    const validation = userValidationSchema.safeParse(user)
    console.log(validation);
    
    if (!validation.success) {
      console.log({ message:validation.error.errors})
    } else {
        const updatedUser = await UserModel.findByIdAndUpdate(id,user, {new: true});
        revalidatePath("/users");
        redirect("/users");
    }

  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
  }
}
