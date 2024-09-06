import { useState, useEffect, useCallback } from "react";

function useHttp(config, immediate = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(immediate);

  const sendRequest = useCallback(
    async (overrideConfig = {}) => {
      setIsLoading(true);
      setError(null);

      const finalConfig = { ...config, ...overrideConfig };

      try {
        const response = await fetch(finalConfig.url, {
          method: finalConfig.method || "GET",
          headers: finalConfig.headers,
          // Don't stringify FormData
          body:
            finalConfig.body instanceof FormData
              ? finalConfig.body
              : finalConfig.body
              ? JSON.stringify(finalConfig.body)
              : undefined,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [config]
  );

  useEffect(() => {
    if (immediate) {
      sendRequest();
    }
  }, [immediate, sendRequest]);

  return { data, error, isLoading, sendRequest };
}

export default useHttp;
