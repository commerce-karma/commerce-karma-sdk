import { z } from "zod";
import { Client } from "./types/client";
import authorize from "./authorize";
import { commerceKarmaBackendURL } from ".";
import { removeFalsyValues } from "./helpers/removeFalsyValues";

export const findClientParams = z
  .object({
    id: z.string({ invalid_type_error: "Id must be of type string." }).nonempty().max(1024).optional(),
    firstName: z.string({ invalid_type_error: "First name must be of type string." }).max(150).nonempty().optional(),
    lastName: z.string({ invalid_type_error: "Last name must be of type string." }).max(150).nonempty().optional(),
    email: z
      .string({ invalid_type_error: "Email must be of type string." })
      .min(5)
      .max(320)
      .email("Must be a valid email address.")
      .optional(),
    phone: z.string({ invalid_type_error: "Phone must be of type string." }).length(10).optional(),
    address: z
      .object({
        street: z
          .string({
            invalid_type_error: "Street must be of type string.",
            required_error: "Street is required for an address."
          })
          .min(3)
          .max(1024),
        city: z
          .string({
            invalid_type_error: "City must be of type string.",
            required_error: "City is required for an address."
          })
          .nonempty()
          .max(100),
        state: z
          .string({
            invalid_type_error: "A state must be of type string.",
            required_error: "A state is required in an address."
          })
          .nonempty()
          .max(100),
        zipcode: z
          .number({
            invalid_type_error: "A zip code must be of type number.",
            required_error: "A zip code is required for an address."
          })
          .max(99999),
        unit: z.string({ invalid_type_error: "Unit must be of type string." }).optional()
      })
      .optional(),
    reviews: z
      .array(z.string({ invalid_type_error: "Review id must be of type string." }).nonempty().max(1024))
      .optional(),
    rating: z.number({ invalid_type_error: "Rating must be of type number." }).min(0).max(5).optional(),
    createdBy: z.string({ invalid_type_error: "CreatedBy must be of type string." }).nonempty().max(1024).optional(),
    createdAt: z.date({ invalid_type_error: "CreatedAt must be a valid date" }).optional(),
    updatedAt: z.date({ invalid_type_error: "UpdatedAt must be a valid date" }).optional(),
    archivedAt: z.date({ invalid_type_error: "UpdatedAt must be a valid date" }).optional()
  })
  .strict();

export type FindClient = z.infer<typeof findClientParams>;

/**
 * Finds one or more find clients
 * @param params An object used to query with @see findClientParams
 * @returns An array of clients
 */
export async function findClient({
  id,
  firstName,
  lastName,
  email,
  phone,
  address,
  rating,
  createdBy,
  createdAt,
  updatedAt,
  archivedAt
}: FindClient): Promise<Client[]> {
  const apiKey = authorize();
  if (!apiKey) {
    throw new Error("Error not authorized");
  }

  const response = await fetch(`${commerceKarmaBackendURL}/api/customer`, {
    headers: {
      "x-Api-Key": apiKey,
      ...removeFalsyValues({
        id,
        firstName,
        lastName,
        email,
        phone,
        address,
        rating,
        createdBy,
        createdAt,
        updatedAt,
        archivedAt
      })
    } as any
  });
  const clients: Client[] = (await response.json()).data;

  if (clients === undefined) {
    throw new Error("Error fetching clients");
  }

  return clients;
}
