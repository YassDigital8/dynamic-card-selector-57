
/**
 * Mock implementation of file upload functionality
 */

export async function uploadFile(
  file: File, 
  path: string, 
  onProgress?: (progress: number) => void
): Promise<boolean> {
  // Simulate upload process with delay
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        
        // Simulate a small delay after reaching 100% before resolving
        setTimeout(() => {
          resolve(true);
        }, 500);
      }
      
      if (onProgress) {
        onProgress(progress / 100);
      }
    }, 500);
  });
}
