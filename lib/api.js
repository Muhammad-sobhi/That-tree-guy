const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith('http')) return path;
  
  // Images should point directly to Koyeb because they don't have CORS issues 
  // and aren't covered by our /api rewrite.
  return `https://ready-ally-thattreeguy-134e425d.koyeb.app/storage/${path}`;
};

export const fetchData = async (endpoint) => {
  try {
    // IMPORTANT: We add /api here so the Next.js Rewrite catches it!
    // This turns "/public/testimonials" into "https://thattreeguy.netlify.app/api/public/testimonials"
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
      cache: 'no-store',
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