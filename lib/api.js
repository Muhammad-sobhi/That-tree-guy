// Get the URL from the environment variable
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith('http')) return path;
  
  // Directly points to the storage folder on your Koyeb backend
  return `${BASE_URL}/storage/${path}`;
};

export const fetchData = async (endpoint) => {
  try {
    // We add the /api prefix here automatically
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
      cache: 'no-store', // Ensures fresh data (SSR/Dynamic)
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
};