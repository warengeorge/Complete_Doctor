/**
 * Auth Error Handling Utilities
 * Provides consistent error classification and messaging
 */

export type AuthErrorType =
  | "INVALID_CREDENTIALS"
  | "EMAIL_NOT_VERIFIED"
  | "ACCOUNT_LOCKED"
  | "SESSION_EXPIRED"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";

export class AuthError extends Error {
  constructor(
    public type: AuthErrorType,
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Classify error from API response
 */
export function classifyAuthError(
  error: unknown,
  statusCode?: number,
): { type: AuthErrorType; message: string } {
  if (error instanceof AuthError) {
    return {
      type: error.type,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("invalid") || message.includes("incorrect")) {
      return {
        type: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      };
    }

    if (message.includes("verified")) {
      return {
        type: "EMAIL_NOT_VERIFIED",
        message: "Please verify your email before logging in.",
      };
    }

    if (message.includes("locked")) {
      return {
        type: "ACCOUNT_LOCKED",
        message: "Your account has been locked. Please contact support.",
      };
    }

    if (message.includes("expired") || message.includes("refresh")) {
      return {
        type: "SESSION_EXPIRED",
        message: "Your session has expired. Please sign in again.",
      };
    }

    if (message.includes("network") || message.includes("timeout")) {
      return {
        type: "NETWORK_ERROR",
        message: "Network error. Please check your connection and try again.",
      };
    }
  }

  // Classify by HTTP status code
  if (statusCode === 401) {
    return {
      type: "SESSION_EXPIRED",
      message: "Your session has expired. Please sign in again.",
    };
  }

  if (statusCode === 403) {
    return {
      type: "INVALID_CREDENTIALS",
      message: "Invalid email or password.",
    };
  }

  if (statusCode && statusCode >= 500) {
    return {
      type: "SERVER_ERROR",
      message: "Server error. Please try again later.",
    };
  }

  if (statusCode && statusCode >= 400) {
    return {
      type: "UNKNOWN_ERROR",
      message: "Request failed. Please try again.",
    };
  }

  return {
    type: "UNKNOWN_ERROR",
    message: "An unexpected error occurred. Please try again.",
  };
}

/**
 * Get user-friendly error message
 */
export function getAuthErrorMessage(
  error: unknown,
  defaultMessage = "An error occurred.",
): string {
  const { message } = classifyAuthError(error);
  return message || defaultMessage;
}

/**
 * Check if error is recoverable
 */
export function isRecoverableAuthError(errorType: AuthErrorType): boolean {
  const nonRecoverableErrors: AuthErrorType[] = [
    "ACCOUNT_LOCKED",
    "EMAIL_NOT_VERIFIED",
  ];
  return !nonRecoverableErrors.includes(errorType);
}

/**
 * Check if error requires re-authentication
 */
export function requiresReAuth(errorType: AuthErrorType): boolean {
  return errorType === "SESSION_EXPIRED" || errorType === "INVALID_CREDENTIALS";
}
