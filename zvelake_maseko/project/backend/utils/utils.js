export async function passwordHash(password) {
  // 1. Кодируем строку в массив байтов (UTF-8)
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

export async function passwordVerify(password, hash){
    return (await passwordHash(password)) === hash;
}
