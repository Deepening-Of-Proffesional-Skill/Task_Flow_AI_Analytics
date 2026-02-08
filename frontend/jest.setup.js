import { TextEncoder, TextDecoder } from "util";
//additional matchers for testing-library
import '@testing-library/jest-dom';

//make TextEncoder and TextDecoder globally available for tests
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;