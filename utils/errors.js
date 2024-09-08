const ERROR_CODES = {
  REQUEST_SUCCESSFUL: 200,
  INVALID_DATA: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  FORBIDDEN: 403,
};

const ERROR_MESSAGES = {
  REQUEST_SUCCESSFUL: "Request successful",
  INVALID_DATA: "Invalid data",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Not found",
  CONFLICT: "Conflict",
  SERVER_ERROR: "Server error",
  FORBIDDEN: "Forbidden",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
