import { useEffect, useState, useRef } from 'react';

type CachedEntry<T> = {
    data: T;
    expiresAt: number;
};

type UseCachedFetchResult<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    retry: () => void;
};

export function useCachedFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    options?: {
        ttl?: number; // default: 24h
        retryCount?: number;
        retryDelay?: number;
    }
): UseCachedFetchResult<T> {
    const ttl = options?.ttl ?? 24 * 60 * 60 * 1000;
    const retryCount = options?.retryCount ?? 2;
    const retryDelay = options?.retryDelay ?? 1000;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const retrySignal = useRef(0); // triggers useEffect rerun

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setLoading(true);
            setError(null);

            // check cache
            const cachedRaw = localStorage.getItem(key);
            if (cachedRaw) {
                try {
                    const cached: CachedEntry<T> = JSON.parse(cachedRaw);
                    if (Date.now() < cached.expiresAt) {
                        if (isMounted) {
                            setData(cached.data);
                            setLoading(false);
                        }
                        return;
                    } else {
                        localStorage.removeItem(key);
                    }
                } catch {
                    localStorage.removeItem(key);
                }
            }

            // fetch with retry
            let attempts = 0;
            while (attempts <= retryCount) {
                try {
                    const res = await fetcher();
                    if (!isMounted) return;

                    localStorage.setItem(
                        key,
                        JSON.stringify({
                            data: res,
                            expiresAt: Date.now() + ttl,
                        })
                    );
                    setData(res);
                    setLoading(false);
                    return;
                } catch (err) {
                    attempts++;
                    if (attempts > retryCount) {
                        if (isMounted) {
                            setError((err as any)?.message || 'Fetch failed');
                            setLoading(false);
                        }
                        return;
                    }
                    await new Promise(res => setTimeout(res, retryDelay));
                }
            }
        };

        load();
        return () => {
            isMounted = false;
        };
    }, [key, retrySignal.current]); // fetcher is intentionally ignored for stability

    const retry = () => {
        retrySignal.current++;
    };

    return { data, loading, error, retry };
}
