/**
 * Validates if a string is a valid UUID v4
 * @param {string} uuid - The UUID string to validate
 * @returns {boolean} - True if valid UUID, false otherwise
 */
export const validateUUID = (uuid) => {
  if (!uuid || typeof uuid !== 'string') {
    return false;
  }
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Validates task data for creation/update
 * @param {Object} data - Task data to validate
 * @param {boolean} isUpdate - Whether this is an update operation
 * @returns {Object} - Validation result { isValid, errors }
 */
export const validateTaskData = (data, isUpdate = false) => {
  const errors = [];
  
  // Title validation
  if (!isUpdate && (!data.title || data.title.trim() === '')) {
    errors.push('Title is required');
  } else if (data.title && data.title.trim() === '') {
    errors.push('Title cannot be empty');
  }
  
  // Status validation
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }
  
  // Description validation (optional, but if provided should be string)
  if (data.description !== undefined && typeof data.description !== 'string') {
    errors.push('Description must be a string');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitizes and validates pagination parameters
 * @param {Object} query - Query parameters
 * @returns {Object} - Sanitized pagination parameters
 */
export const validatePagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(query.limit) || 10));
  
  return { page, limit };
};

/**
 * Validates query parameters for task filtering
 * @param {Object} query - Query parameters
 * @returns {Object} - Validation result with sanitized parameters
 */
export const validateTaskQuery = (query) => {
  const result = {
    isValid: true,
    errors: [],
    sanitized: {}
  };
  
  // Status filter validation
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (query.status) {
    if (validStatuses.includes(query.status)) {
      result.sanitized.status = query.status;
    } else {
      result.isValid = false;
      result.errors.push(`Invalid status filter. Must be one of: ${validStatuses.join(', ')}`);
    }
  }
  
  // Pagination validation
  const pagination = validatePagination(query);
  result.sanitized.page = pagination.page;
  result.sanitized.limit = pagination.limit;
  
  return result;
};