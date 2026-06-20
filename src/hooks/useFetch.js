import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook genérico de fetching basado en useState/useEffect.
 * Usado en casi todas las pantallas para traer datos del backend
 * con estados de loading/error y la posibilidad de refetch manual.
 */
export function useFetch(fetcher) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetcherRef = useRef(fetcher);
    fetcherRef.current = fetcher;

    const run = useCallback(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        fetcherRef
            .current()
            .then((d) => {
                if (!cancelled) setData(d);
            })
            .catch((e) => {
                if (!cancelled) setError(e);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => run(), [run]);

    return { data, loading, error, refetch: run };
}
