export type AuthUserProfile = {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  displayName: string | null;
  profileUrl: string | null;
};

export type AuthUser = {
  id: string;
  email: string;
  roles: string[];
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile: AuthUserProfile | null;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthSessionData = {
  user: AuthUser;
};

export type AuthRouteResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};

export type BackendLoginResponse = {
  success?: boolean;
  message?: string;
  data?: {
    data?: {
      user?: AuthUser;
      token?: string;
    };
  };
};
