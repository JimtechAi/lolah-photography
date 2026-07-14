export type BookingFormData = {
  brideName: string;
  groomName: string;
  email: string;
  phoneNumber: string;
  weddingDate: string;
  eventVenue: string;
  weddingType: string;
  message: string;
};

export const initialBookingFormData: BookingFormData = {
  brideName: "",
  groomName: "",
  email: "",
  phoneNumber: "",
  weddingDate: "",
  eventVenue: "",
  weddingType: "Wedding Photography",
  message: "",
};

export const weddingTypes = [
  "Wedding Photography",
  "Traditional Wedding",
  "Engagement Session",
  "Bridal Portrait",
  "Maternity",
  "Baby & Newborn",
  "Family Portrait",
  "Birthday Photography",
  "Corporate Portrait",
  "Event Coverage",
  "Drone Photography & Videography",
];