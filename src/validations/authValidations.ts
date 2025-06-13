export const validateMobileNumber = (text: string): string => {
  const mobileRegex = /^(923\d{9})$/;
  // const mobileRegex = /^923\d{2}-\d{7}$/;
  if (!text) return 'Mobile number is required';
  if (!mobileRegex.test(text))
    return 'Invalid mobile number. Format: 92XXXXXXXXX';
  return '';
};

export const validateEmail = (text: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|com\.pk)$/;
  if (!text) return 'Email is required';
  if (!emailRegex.test(text)) return 'Invalid email address';
  return '';
};

export const validateCNIC = (text: string): string => {
  const cnicRegex = /^\d{5}-?\d{7}-?\d{1}$/;
  if (!text) return 'CNIC is required';
  if (!cnicRegex.test(text)) return 'Invalid CNIC. Format: 12345-6789012-3';
  return '';
};

export const validatePassword = (text: string): string => {
  if (!text) return 'Password is required';

  const minLength = 8;

  const allowedSpecialChars = `!@#$%^&*()_\\-+=\\{\\}\\[\\]:;"'?/.,|`;
  const allowedSpecialCharRegex = new RegExp(`[${allowedSpecialChars}]`);
  const disallowedCharsRegex = new RegExp(`[^a-zA-Z0-9${allowedSpecialChars}]`);

  if (text.length < minLength) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/[A-Z]/.test(text)) {
    return 'Password must contain at least one uppercase letter.';
  }

  if (!/[0-9]/.test(text)) {
    return 'Password must contain at least one number.';
  }

  if (!allowedSpecialCharRegex.test(text)) {
    return 'Password must include at least one allowed special character.';
  }

  if (disallowedCharsRegex.test(text)) {
    return 'Password contains invalid special characters.';
  }

  return '';
};
