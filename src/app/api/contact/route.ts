import { NextRequest } from "next/server";
import Contact from "@/database/models/Contact";
import { addRowSheet } from "@/lib/googleSheets";
import * as yup from "yup";
import dbConnection from "@/lib/dbconnection";
import { IContact } from "@/database/models/Contact";
import { IContactInput } from "@/deb/types";

const ContactSchema = yup.object({
  fullName: yup
    .string()
    .required("Fullname is required")
    .min(3, "Fullname must be at least 3 characters")
    .max(50, "Fullname cannot exceed 50 characters")
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Fullname can only contain letters and spaces"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validations with yup
    const validatedData = await ContactSchema.validate(body, {
      abortEarly: false,
    });

    // Connection with MongoDB
    await dbConnection();

    // Keep in Mongo
    const newContactData: IContactInput = {
      fullName: validatedData.fullName,
      email: validatedData.email,
      message: validatedData.message,
    };

    const contact: IContact = await Contact.create(newContactData);

    // Keep in Google Sheets
    await addRowSheet(contact);

    // Answer to frontend
    return Response.json(
      { ok: true, message: "Contact saved successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(error);

    // Errors in yup?
    if (error instanceof yup.ValidationError) {
      return Response.json(
        { ok: false, message: error.errors.join(", ") },
        { status: 400 }
      );
    }

    //Generic error?
    if (error instanceof Error) {
      return Response.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    // Other errors
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
