"use server";

// appwrite imports
import { ID, InputFile, Query } from "node-appwrite";
import { users } from "../appwrite.config";

// utils imports
import { parseStringify } from "../utils";

/* ----------------- Helper Functions ------------------ */
const handleError = (message: string, error: unknown) => {
  console.error(error, message);
  throw error;
};

/* ----------------- Server Actions ------------------ */
export const createUser = async ({ name, email, phone }: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );
    console.log("New user created successfully");
    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      console.log("User already exists");
      const documents = await users.list([Query.equal("email", [email])]);
      console.log(documents?.users);
      return parseStringify(documents?.users[0]);
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    handleError("There was a Error in getUser: ", error);
  }
};
