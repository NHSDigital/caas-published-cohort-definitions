import { customAlphabet } from 'nanoid';

// Base 32, but without l,1,o,0. This is to avoid confusion between l/1 and o/0
export const nanoid = customAlphabet('abcdefghijkmnpqrstuvwxyz23456789', 12);
