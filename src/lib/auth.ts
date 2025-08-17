// Simple authentication check with localStorage safety
const ADMIN_PASSWORD = "admin123"; // In real app, this would be handled differently

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export function isAuthenticated(): boolean {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available');
    return false;
  }
  
  try {
    return localStorage.getItem("admin_authenticated") === "true";
  } catch (error) {
    console.warn('Error checking authentication:', error);
    return false;
  }
}

export function login(password: string): boolean {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available for login');
    return false;
  }
  
  if (password === ADMIN_PASSWORD) {
    try {
      localStorage.setItem("admin_authenticated", "true");
      return true;
    } catch (error) {
      console.warn('Error setting authentication:', error);
      return false;
    }
  }
  return false;
}

export function logout(): void {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available for logout');
    return;
  }
  
  try {
    localStorage.removeItem("admin_authenticated");
  } catch (error) {
    console.warn('Error during logout:', error);
  }
}