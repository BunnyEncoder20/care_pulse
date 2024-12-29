import * as sdk from "node-appwrite";

export const {
  APPWRITE_PROJECT_ID: PROJECT_ID,
  APPWRITE_API_KEY: API_KEY,
  APPWRITE_DATABASE_ID,
  APPWRITE_PATIENT_COLLECTION_ID,
  APPWRITE_DOCTOR_COLLECTION_ID,
  APPWRITE_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_APPWRITE_BUCKET_ID: BUCKET_ID,
  NEXT_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();
client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

/* -------------------- exposing SDK -------------------- */
export const db = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
