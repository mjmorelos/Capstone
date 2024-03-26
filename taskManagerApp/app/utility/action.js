"use server";
import { revalidatePath } from "next/cache";
import { User } from "./models";
import { Task } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";
import prisma from "@/app/utility/prismadb";

export const addUser = async (formData) => {
  const { name, email, password, image, isAdmin, isActive, phone } =
    Object.fromEntries(formData);
  try {
    await connectToDB();
    const existingUser = await User.findOne({
      $or: [{ name }, { email }, { phone }]
    }).lean().exec();

    if (existingUser) {
      throw new Error("User with the same name, email, or phone already exists!");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      image,
      isAdmin,
      isActive,
      phone,
    });
  await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user. User with the same name, email, or phone already exists!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

//delete user/task
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user!");
  }
  revalidatePath("/dashboard/users");
};

export const deleteTask = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Task.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete task!");
  }
  revalidatePath("/dashboard/tasks");
};

//update

export const updateUser = async (formData) => {
  const { id, name, email, password, image, isAdmin, isActive, phone } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      name,
      email,
      password,
      image,
      isAdmin,
      isActive,
      phone,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users"); //Ensure unique email constraint is handled elsewhere
};

// update task

export const updateTask = async (formData) => {
  const { id, fname, lname, task, date, startTime, endTime, location } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      fname,
      lname,
      task,
      date,
      startTime,
      endTime,
      location,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Task.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user!");
  }
  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
};

export const updateMyTask = async (formData) => {
  const { id, fname, lname, task, date, startTime, endTime, location } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      fname,
      lname,
      task,
      date,
      startTime,
      endTime,
      location,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Task.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user!");
  }
  revalidatePath("/dashboard/MyTask");
  redirect("/dashboard/MyTask");
};

export const authenticate = async (prevState, formData) => {
  const { name, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { name, password });
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw error;
  }
};
