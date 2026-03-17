// Components
export { AdminLoginView } from "./components/admin-login-view";
export { AuthBootstrap } from "./components/auth-bootstrap";

// Store & Hooks
export { useAuthStore } from "./store";
export { useAuthUser } from "./hooks/use-auth-user";
export {
  useAuthPermission,
  useRequireAuth,
  useAutoLogout,
  useUserDisplayName,
  useIsAdmin,
  useIsInstructor,
  useIsLearner,
} from "./hooks/use-auth-permission";

// Mutations
export { useLoginMutation } from "./services/useLoginMutation";
export { useLogoutMutation } from "./services/useLogoutMutation";

// Services
export { loginRequest, getMeRequest, logoutRequest } from "./services/auth-api";

// Types
export type {
  AuthUser,
  AuthUserProfile,
  LoginInput,
  BFFLoginResponse,
  BFFMeResponse,
  BFFRefreshResponse,
  BackendLoginResponse,
  BackendMeResponse,
  BackendRefreshResponse,
  TokenPair,
} from "./types";
