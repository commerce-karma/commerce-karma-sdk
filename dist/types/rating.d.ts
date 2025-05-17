import { z } from "zod";
import { Rating } from "./types/rating";
export declare const findRatingParams: z.ZodObject<
  {
    id: z.ZodOptional<z.ZodString>;
    paymentEase: z.ZodOptional<z.ZodNumber>;
    workEase: z.ZodOptional<z.ZodNumber>;
    wouldRefer: z.ZodOptional<z.ZodNumber>;
    overall: z.ZodOptional<z.ZodNumber>;
    text: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    archivedAt: z.ZodOptional<z.ZodDate>;
  },
  "strict",
  z.ZodTypeAny,
  {
    id?: string | undefined;
    paymentEase?: number | undefined;
    workEase?: number | undefined;
    wouldRefer?: number | undefined;
    overall?: number | undefined;
    text?: string | undefined;
    customer?: string | undefined;
    createdBy?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    archivedAt?: Date | undefined;
  },
  {
    id?: string | undefined;
    paymentEase?: number | undefined;
    workEase?: number | undefined;
    wouldRefer?: number | undefined;
    overall?: number | undefined;
    text?: string | undefined;
    customer?: string | undefined;
    createdBy?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    archivedAt?: Date | undefined;
  }
>;
export type FindRatingParams = z.infer<typeof findRatingParams>;
/**
 * Find one or more ratings
 * @params An object to query with @see findRatingParams
 * @returns An array of ratings
 */
export declare function findRating({
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
}: FindRatingParams): Promise<Rating[]>;
//# sourceMappingURL=rating.d.ts.map
