export function validateName(name: string): string | null {
  if (!name || name.trim().length < 3) {
    return "Name must be at least 3 characters long";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
  }
  return null;
}
