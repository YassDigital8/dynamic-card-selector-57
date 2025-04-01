
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
    console.log('Direct fetch failed, trying with CORS proxy...', error);
    
    // Try different proxy services in sequence until one works
    const proxies = [
      `https://cors-anywhere.herokuapp.com/${url}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      `https://api.codetabs.com/v1/proxy?quest=${url}`,
      `https://thingproxy.freeboard.io/fetch/${url}`
    ];
    
    // Try each proxy in sequence
    for (const proxyUrl of proxies) {
      try {
        console.log(`Trying proxy: ${proxyUrl}`);
        
        // Clone the options and add necessary headers for this proxy
        const proxyOptions = {
          ...options,
          headers: {
            ...options.headers,
            'X-Requested-With': 'XMLHttpRequest', // Required by CORS Anywhere
          }
        };
        
        return await fetch(proxyUrl, proxyOptions);
      } catch (proxyError) {
        console.log(`Proxy failed: ${proxyUrl}`, proxyError);
        // Continue to next proxy
      }
    }
    
    // If all proxies fail, throw the original error
    throw error;
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
  codeTabs: 'https://api.codetabs.com/v1/proxy?quest=',
  thingProxy: 'https://thingproxy.freeboard.io/fetch/',
};
