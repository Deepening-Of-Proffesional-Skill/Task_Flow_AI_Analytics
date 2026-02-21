import { TextEncoder, TextDecoder } from "util";
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

process.env.VITE_API_URL = "http://localhost:3000";
