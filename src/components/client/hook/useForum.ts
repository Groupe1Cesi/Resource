import { useState, useEffect } from 'react';
import { Forums, Forum } from '@/types/forum';
const useForum = async () => {
    const response = await fetch('/api/regions')
    const res = await response.json()
    return res
}

export { useForum };