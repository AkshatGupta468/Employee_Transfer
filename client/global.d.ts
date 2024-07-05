declare interface User {
  _id: string;
  __v?: number;
  email: string;
  location?: string;
  name?: string;
  phone_number?: string;
  photo?: string;
  role?: string;
  department?: string;
  preferredLocations: string[];
  passwordResetExpires?: string;
  passwordResetToken?: string;
}

var token: String | null;
var currentUser: User | null;
