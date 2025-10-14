/**
 * Standard success response
 */
export const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data);
};

/**
 * Standard error response
 */
export const errorResponse = (res, message, statusCode = 500, code = 'ERROR', details = []) => {
  return res.status(statusCode).json({
    error: {
      code,
      message,
      details,
    },
  });
};

/**
 * Created response (201)
 */
export const createdResponse = (res, data) => {
  return res.status(201).json(data);
};

/**
 * No content response (204)
 */
export const noContentResponse = (res) => {
  return res.status(204).send();
};
