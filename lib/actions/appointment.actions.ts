"use server";

// appwrite
import { ID, Query } from "node-appwrite";
import {
  APPWRITE_APPOINTMENT_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  databases,
} from "../appwrite.config";

// utils
import { parseStringify } from "../utils";

// custom types
import { Appointment } from "@/types/appwrite.types";

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

export const getAppointment = async (appointmentId: string) => {
  console.log("Getting appointment with id:", appointmentId, "...");
  try {
    const appointment = await databases.getDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    console.log("Appointment found ✅");
    return parseStringify(appointment);
  } catch (error) {
    handleError("There was a Error in getAppointment", error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    console.log("Fetching recent appointments...");
    const appointments = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    console.log("fetched appointments ✅\nCounting appointments...");
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount++;
        } else if (appointment.status === "pending") {
          acc.pendingCount++;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount++;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    console.log("Recent appointments object generated ✅");
    return parseStringify(data);
  } catch (error) {
    handleError("There was a Error in getRecentAppointmentList", error);
  }
};
