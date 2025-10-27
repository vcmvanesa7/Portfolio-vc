"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendContact } from "@/services/contactService";
import { Button } from "@/components/Button";
import { notification } from "@/utils/notification";
import styles from "@/app/[locale]/contact/contact.module.css";

// Import the unified translation type
import type { DictionarySection } from "@/types/dictionaries";

interface ContactFormInputs {
  fullName: string;
  email: string;
  message: string;
}

// No need for "Translations" type anymore

const schema = yup.object({
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

export default function ContactForm({
  translations,
}: {
  translations: DictionarySection; // Accepts dictionary safely
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      const res = await sendContact(data);

      if (res.ok) {
        notification(res.message, "success");
        reset();
      } else {
        notification(res.message, "error");
      }
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        notification(err.message, "error");
      } else {
        notification("Something went wrong, please try again.", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>{translations.title ?? "Contact"}</h1>

      <div>
        <input
          {...register("fullName")}
          placeholder={translations.placeholderFullName}
          className={styles.input}
        />
        {errors.fullName && (
          <p className={styles.errorText}>{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder={translations.placeholderEmail}
          className={styles.input}
        />
        {errors.email && (
          <p className={styles.errorText}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder={translations.placeholderMessage}
          className={`${styles.input} ${styles.textarea}`}
        />
        {errors.message && (
          <p className={styles.errorText}>{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? translations.sending : translations.send}
      </Button>
    </form>
  );
}
