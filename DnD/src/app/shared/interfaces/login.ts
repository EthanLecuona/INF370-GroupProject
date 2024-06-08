import { UserRole } from "./user-role";

export interface Login {
    userId: number;
    userEmail: string;
    access_token: string;
    expires_in: number;
    userProfilePicture: string;
    
}