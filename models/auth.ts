export interface AuthProps {
    accessToken: string | null;
    authenticated: boolean | null;
    expiresIn?: number | null;
}