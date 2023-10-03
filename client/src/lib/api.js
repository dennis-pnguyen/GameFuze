/**
 * Signs in a user
 */
export async function signIn(username, password) {
  return await signUpOrIn('sign-in', username, password);
}

/**
 * Signs up a user
 */
export async function signUp(username, password) {
  return await signUpOrIn('sign-up', username, password);
}

/**
 * Signs in or up depending on action
 */
async function signUpOrIn(action, username, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(`/api/${action}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
