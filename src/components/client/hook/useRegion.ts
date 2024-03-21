import { useState, useEffect } from 'react';
import { Regions, Region } from '@/types/region';
const useRegion = () => {
    const [data, setData] = useState<Regions>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRegions = async () => {
        const response = await fetch('/api/regions')
        const res = await response.json()
        setData(res)
        setLoading(false)
    }
    useEffect(() => {
        fetchRegions()
    }, []);
    return { data, loading }
}

export { useRegion };