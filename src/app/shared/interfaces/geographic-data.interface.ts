/**
 * Interface for geographic data extraction results
 */
export interface GeographicData {
  country: string;
  autonomy: string;
  province: string;
  municipality: string;
}

/**
 * Interface for input text processing
 */
export interface TextInput {
  texto: string;
}

/**
 * Interface for nested text input format
 */
export interface NestedTextInput {
  texto: TextInput;
}