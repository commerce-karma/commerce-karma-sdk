import { z } from "zod";
import { Client } from "./types/client";
export declare const findClientParams: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipcode: z.ZodNumber;
        unit: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zipcode: number;
        unit?: string | undefined;
    }, {
        street: string;
        city: string;
        state: string;
        zipcode: number;
        unit?: string | undefined;
    }>>;
    reviews: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rating: z.ZodOptional<z.ZodNumber>;
    createdBy: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    archivedAt: z.ZodOptional<z.ZodDate>;
}, "strict", z.ZodTypeAny, {
    id?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: {
        street: string;
        city: string;
        state: string;
        zipcode: number;
        unit?: string | undefined;
    } | undefined;
    reviews?: string[] | undefined;
    rating?: number | undefined;
    createdBy?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    archivedAt?: Date | undefined;
}, {
    id?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: {
        street: string;
        city: string;
        state: string;
        zipcode: number;
        unit?: string | undefined;
    } | undefined;
    reviews?: string[] | undefined;
    rating?: number | undefined;
    createdBy?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    archivedAt?: Date | undefined;
}>;
export type FindClient = z.infer<typeof findClientParams>;
/**
 * Finds one or more find clients
 * @param params An object used to query with @see findClientParams
 * @returns An array of clients
 */
export declare function findClient({ id, firstName, lastName, email, phone, address, rating, createdBy, createdAt, updatedAt, archivedAt }: FindClient): Promise<Client[]>;
//# sourceMappingURL=client.d.ts.map