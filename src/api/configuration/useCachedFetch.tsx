import { useEffect, useState } from 'react';

export function useCachedFetch<T>(key: string, fetcher: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            const cached = localStorage.getItem(key);

            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    if (Date.now() < parsed.expiresAt) {
                        if (isMounted) {
                            setData(parsed.data);
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

            try {
                const res = await fetcher();
                if (isMounted) {
                    setData(res);
                    setLoading(false);
                }
                localStorage.setItem(
                    key,
                    JSON.stringify({
                        data: res,
                        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
                    })
                );
            } catch (err) {
                console.error(`Failed to fetch key "${key}":`, err);
                if (isMounted) setLoading(false);
            }
        };

        load();
        return () => {
            isMounted = false;
        };
    }, [key, fetcher]);

    return { data, loading };
}
