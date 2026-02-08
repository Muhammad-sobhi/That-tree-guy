const BASE_URL = "http://localhost:8000";

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith('http')) return path; // Handle external links
  return `${BASE_URL}/storage/${path}`;
};

export const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;

    const data = await res.json();
    return data; // Clean return of the JSON object
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
};