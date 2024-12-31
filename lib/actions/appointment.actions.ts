"use server";

import { ID } from "node-appwrite";
import {
  APPWRITE_APPOINTMENT_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

/* ----------------- Helper Functions ------------------ */
const handleError = (message: string, error: unknown) => {
  console.error(error, message + "❌\n");
  throw error;
};

/* ----------------- Server Actions ------------------ */
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    // create the patient document to database
    console.log("Entering appointment data into DB...");
    const newAppointment = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    console.log("Appointment created successfully ✅");
    return parseStringify(newAppointment);
  } catch (error) {
    handleError("There was a Error in createUser", error);
  }
};
