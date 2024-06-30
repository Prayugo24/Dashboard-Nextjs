export async function authenticateUser(username: string, password: string) {
    // Implementasi logika autentikasi Anda di sini
    // Misalnya, periksa kredensial dari database
    if (username === 'admin' && password === 'admin') {
      return { id: 1, admin: true };
    }
  
    return null;
  }