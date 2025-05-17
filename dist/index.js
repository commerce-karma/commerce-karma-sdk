import { z } from 'zod';

/**
 * Authorizes a connection to Commerce Karma by geting the api key from the url and saving it to cookies.
 * @param location The window location search object
 * @returns The API key for Commerce Karma
 */
function authorize(location) {
    const windowLocation = location || window.location.search;
    const urlParams = new URLSearchParams(windowLocation);
    const apiKey = urlParams.get("CkApiKey");
    const cookieIndex = document.cookie.split(";").indexOf("commerce-karma-api-key");
    if (cookieIndex !== -1) {
        return document.cookie.split(";")[cookieIndex];
    }
    else if (!apiKey && cookieIndex === -1) {
        throw new Error("Error failed to authorized");
    }
    document.cookie = `commerce-karma-api-key=${apiKey};`;
    return apiKey;
}

const removeFalsyValues = (obj) => {
    const returnObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] || (Array.isArray(obj[key]) && obj[key].length > 0)) {
            returnObj[key] = obj[key];
        }
    });
    return returnObj;
};

z
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
/**
 * Finds one or more find clients
 * @param params An object used to query with @see findClientParams
 * @returns An array of clients
 */
async function findClient({ id, firstName, lastName, email, phone, address, rating, createdBy, createdAt, updatedAt, archivedAt }) {
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
        }
    });
    const clients = (await response.json()).data;
    if (clients === undefined) {
        throw new Error("Error fetching clients");
    }
    return clients;
}

z
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
/**
 * Find one or more ratings
 * @params An object to query with @see findRatingParams
 * @returns An array of ratings
 */
async function findRating({ id, paymentEase, workEase, wouldRefer, overall, text, customer, createdBy, createdAt, updatedAt, archivedAt }) {
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

const commerceKarmaURL = "https://commerce-karma.vercel.app";
const commerceKarmaBackendURL = "https://7o1h60hh44.execute-api.us-east-1.amazonaws.com";

export { authorize, commerceKarmaBackendURL, commerceKarmaURL, findClient, findRating };
