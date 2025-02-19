import dotenv from 'dotenv';
const envFound = dotenv.config();

export const APP_HOST = process.env.APP_HOST;
export const API_KEY = process.env.API_KEY;
export const CACHE_TIME = process.env.CACHE_TIME;

export const MESSAGES = {
    FILE_SUCCESSFULLY_UPLOADED: 'Successfully uploaded.',
    FETCHED_SUCCESSFULLY_: 'Successfully fetched the data.',
    NO_DATA_FOUND: 'Data is not found.',
    TRY_AGAIN: 'Server error. please try again later.!'
}

export const HTTP_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}