"use server";

// appwrite imports
import { ID, InputFile, Query } from "node-appwrite";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_PATIENT_COLLECTION_ID,
  BUCKET_ID,
  ENDPOINT,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";

// utils imports
import { parseStringify } from "../utils";

/* ----------------- Helper Functions ------------------ */
const handleError = (message: string, error: unknown) => {
  console.error(error, message);
  throw error;
};

/* ----------------- Server Actions ------------------ */
export const createUser = async ({ name, email, phone }: CreateUserParams) => {
  console.log("Creating user...");
  try {
    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );
    console.log("New user created successfully ✅");
    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      console.log("User already exists...");
      const documents = await users.list([Query.equal("email", [email])]);

      console.log("User data fetched successfully ✅");
      console.log(documents?.users);
      const userData = {
        ...documents?.users[0],
        registered: true,
      };
      return parseStringify(userData);
    }

    handleError("There was a Error in createUser ❌\n", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    console.log("Getting user id:", userId);
    const user = await users.get(userId);
    console.log("User found");
    return parseStringify(user);
  } catch (error) {
    handleError("There was a Error in getUser ❌\n", error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log("Registering Patient...");
  try {
    // upload the file to bucket
    let file;
    if (identificationDocument) {
      console.log("Uploading identification file to bucket...");
      const inputFile =
        identificationDocument &&
        InputFile.fromBlob(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      console.log("File uploaded successfully ✅", file);
    }

    // create the patient document to database
    console.log("Entering Patient data into DB...");
    const newPatient = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );

    console.log("Patient registered successfully ✅");
    return parseStringify(newPatient);
  } catch (error) {
    handleError("There was a Error in registerPatient ❌\n", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    console.log("Getting patient id:", userId, "...");
    const patient = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    console.log("Patient found ✅");
    return parseStringify(patient.documents[0]);
  } catch (error) {
    handleError("There was a Error in getUser ❌\n", error);
  }
};
