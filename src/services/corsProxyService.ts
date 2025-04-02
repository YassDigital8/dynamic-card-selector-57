
/**
 * A service to handle CORS issues by providing proxy options and fallbacks
 */

// Check if we're running in a development environment
const isDevelopment = import.meta.env.DEV;

// List of CORS proxies to try in sequence, with improved reliability
const CORS_PROXIES = [
  {
    name: 'CORS Anywhere (Direct)',
    url: (targetUrl: string) => `https://cors-anywhere.herokuapp.com/${targetUrl}`,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  },
  {
    name: 'AllOrigins',
    url: (targetUrl: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    headers: {}
  },
  {
    name: 'CodeTabs',
    url: (targetUrl: string) => `https://api.codetabs.com/v1/proxy?quest=${targetUrl}`,
    headers: {}
  },
  {
    name: 'ThingProxy',
    url: (targetUrl: string) => `https://thingproxy.freeboard.io/fetch/${targetUrl}`,
    headers: {}
  },
  {
    name: 'CORSProxy.io',
    url: (targetUrl: string) => `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
    headers: {}
  }
];

/**
 * Directly bypass CORS using the no-cors mode and custom headers
 * This is a last resort attempt that might work in some cases
 */
const attemptNoCorsMode = async (url: string, options: RequestInit = {}): Promise<Response> => {
  console.log('Attempting no-cors mode as last resort');
  
  const noCorsOptions = {
    ...options,
    mode: 'no-cors' as RequestMode,
    headers: {
      ...options.headers,
      'Access-Control-Allow-Origin': '*',
    }
  };
  
  return fetch(url, noCorsOptions);
};

/**
 * Try to fetch with enhanced CORS handling mechanisms
 * @param url The URL to fetch
 * @param options Fetch options
 * @returns Promise with the fetch response
 */
export const fetchWithCorsHandling = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  // Log the fetch attempt
  console.log(`Attempting to fetch with enhanced CORS handling: ${url}`);
  
  try {
    // First try direct fetch with additional CORS-friendly options
    console.log('Trying direct fetch with CORS headers...');
    
    // Clone the options to avoid modifying the original
    const corsOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      mode: 'cors' as RequestMode,
      credentials: 'omit' as RequestCredentials, // Avoid sending cookies by default
    };
    
    try {
      const response = await fetch(url, corsOptions);
      if (response.ok) {
        console.log('Direct fetch successful!');
        return response;
      }
      console.log('Direct fetch failed with status:', response.status);
    } catch (directError) {
      console.log('Direct fetch error:', directError);
    }
    
    // Try each proxy in sequence until one works
    for (const proxy of CORS_PROXIES) {
      try {
        console.log(`Trying ${proxy.name} proxy...`);
        
        const proxyUrl = proxy.url(url);
        
        // Merge the headers from the original options with the proxy-specific headers
        const proxyOptions = {
          ...options,
          headers: {
            ...options.headers,
            ...proxy.headers
          }
        };
        
        // Remove body for GET requests through proxies
        if (options.method === 'GET' || !options.method) {
          delete proxyOptions.body;
        }
        
        // Try the current proxy
        const response = await fetch(proxyUrl, proxyOptions);
        
        // Check if we got an error response from the proxy itself
        const contentType = response.headers.get('content-type');
        
        if (!response.ok && contentType?.includes('text/html')) {
          // This could be a proxy error page rather than a proxy success with target API error
          const text = await response.text();
          if (text.includes('error') || text.includes('Error') || text.includes('403') || text.includes('forbidden')) {
            console.log(`${proxy.name} proxy error:`, text);
            throw new Error(`${proxy.name} proxy error: ${response.status} ${response.statusText}`);
          }
        }
        
        console.log(`${proxy.name} proxy successful`);
        return response;
      } catch (proxyError) {
        console.log(`${proxy.name} proxy failed:`, proxyError);
        // Continue to next proxy
      }
    }
    
    // Last resort: try with no-cors mode
    // Note: This will limit what we can do with the response
    try {
      const noCorsResponse = await attemptNoCorsMode(url, options);
      console.log('No-CORS attempt completed - note that response data may be limited');
      return noCorsResponse;
    } catch (noCorsError) {
      console.log('No-CORS attempt failed:', noCorsError);
    }
    
    // If all proxies and fallbacks fail, throw a clear error
    console.error('All CORS bypass attempts failed');
    throw new Error('Could not access API: All CORS bypass methods failed. The server may be down or unreachable. Please try again later or use Demo Mode.');
  } catch (error) {
    console.error('CORS handling final error:', error);
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
  corsProxyIo: 'https://corsproxy.io/?',
};
