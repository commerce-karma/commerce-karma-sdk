import { z } from "zod";
import { Rating } from "./types/rating";
import authorize from "./authorize";
import { commerceKarmaBackendURL } from ".";
import { removeFalsyValues } from "./helpers/removeFalsyValues";

export const findRatingParams = z
  .object({
    id: z.string({ invalid_type_error: "Id must be of type string." }).nonempty().max(1024).optional(),
    paymentEase: z.number({ invalid_type_error: "Payment ease must be of type number." }).min(1).max(5).optional(),
    workEase: z.number({ invalid_type_error: "Work ease must be of type number." }).min(1).max(5).optional(),
    wouldRefer: z.number({ invalid_type_error: "Would refer must be of type number." }).min(1).max(5).optional(),
    overall: z.number({ invalid_type_error: "Overall must be of type number." }).optional(),
    text: z.string({ invalid_type_error: "Text must be of type string." }).nonempty().max(5000).optional(),
    customer: z.string({ invalid_type_error: "Customer id must be of type string." }).nonempty().max(1024).optional(),
    createdBy: z.string({ invalid_type_error: "CreatedBy must be of type string." }).nonempty().max(1024).optional(),
    createdAt: z.date({ invalid_type_error: "CreatedAt must be a valid date" }).optional(),
    updatedAt: z.date({ invalid_type_error: "UpdatedAt must be a valid date" }).optional(),
    archivedAt: z.date({ invalid_type_error: "ArchivedAt must be a valid date" }).optional()
  })
  .strict();

export type FindRatingParams = z.infer<typeof findRatingParams>;

/**
 * Find one or more ratings
 * @params An object to query with @see findRatingParams
 * @returns An array of ratings
 */
export async function findRating({
  id,
  paymentEase,
  workEase,
  wouldRefer,
  overall,
  text,
  customer,
  createdBy,
  createdAt,
  updatedAt,
  archivedAt
}: FindRatingParams): Promise<Rating[]> {
  const apiKey = authorize();
  if (!apiKey) {
    throw new Error("Error not authorized");
  }

  const response = await fetch(`${commerceKarmaBackendURL}/api/rating`, {
    headers: {
      "x-Api-Key": apiKey,
      ...removeFalsyValues({
        id,
        paymentEase,
        workEase,
        wouldRefer,
        overall,
        text,
        customer,
        createdBy,
        createdAt,
        updatedAt,
        archivedAt
      })
    }
  });

  const ratings = (await response.json()).data;

  if (ratings === undefined) {
    throw new Error("Error fetching ratings");
  }

  return ratings;
}
