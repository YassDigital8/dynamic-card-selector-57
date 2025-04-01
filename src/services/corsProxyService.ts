
/**
 * A service to handle CORS issues by providing proxy options
 */

// Check if we're running in a development environment
const isDevelopment = import.meta.env.DEV;

/**
 * Attempts to fetch a URL through various methods to bypass CORS restrictions
 * @param url The URL to fetch
 * @param options Fetch options
 * @returns Promise with the fetch response
 */
export const fetchWithCorsHandling = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  // Log the fetch attempt
  console.log(`Attempting to fetch with CORS handling: ${url}`);
  
  try {
    // First try direct fetch
    console.log('Trying direct fetch...');
    return await fetch(url, options);
  } catch (error) {
    console.log('Direct fetch failed, trying with CORS Anywhere proxy...', error);
    
    // If direct fetch fails, try using CORS Anywhere proxy
    // Note: For production, you should set up your own proxy or ensure proper CORS headers on the server
    const corsAnywhereUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    
    try {
      return await fetch(corsAnywhereUrl, {
        ...options,
        headers: {
          ...options.headers,
          'X-Requested-With': 'XMLHttpRequest', // Required by CORS Anywhere
        }
      });
    } catch (proxyError) {
      console.log('CORS Anywhere proxy failed:', proxyError);
      
      // If that fails too, throw the original error
      throw error;
    }
  }
};

/**
 * Creates a URL with appropriate CORS handling based on environment
 * @param baseUrl The base URL to modify
 * @returns A URL potentially modified for CORS handling
 */
export const createCorsHandledUrl = (baseUrl: string): string => {
  if (isDevelopment) {
    // In development, we might use a proxy
    return `/proxy-api/${baseUrl.replace(/^https?:\/\//, '')}`;
  }
  return baseUrl;
};

// Export a list of known CORS-enabled proxies that can be used
export const corsProxies = {
  corsAnywhere: 'https://cors-anywhere.herokuapp.com/',
  allOrigins: 'https://api.allorigins.win/raw?url=',
};
