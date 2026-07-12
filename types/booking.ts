export type BookingFormData = {
  brideName: string;
  groomName: string;
  email: string;
  phoneNumber: string;
  weddingDate: string;
  eventVenue: string;
  weddingType: string;
  budget: string;
  message: string;
};

export const initialBookingFormData: BookingFormData = {
  brideName: "",
  groomName: "",
  email: "",
  phoneNumber: "",
  weddingDate: "",
  eventVenue: "",
  weddingType: "White Wedding",
  budget: "",
  message: "",
};

export const weddingTypes = [
  "White Wedding",
  "Traditional Wedding",
  "Court Wedding",
  "Destination Wedding",
  "Wedding Weekend",
  "Other",
];