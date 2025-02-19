import NodeCache from 'node-cache';
import { CACHE_TIME } from '../config/variables';
const cache = new NodeCache({ stdTTL: Number(CACHE_TIME) }); 

/**
 * Set the cache
 * @param key 
 * @param data 
 */
export async function setCache(key: string, data: string): Promise<void> {
    console.info(`set the cache for ${key} data: ${data}`);
    cache.set(key, data);
}

/**
 * Get the cache for a given key
 * @param key 
 * @returns 
*/
export async function getCache(key: string): Promise<string | null> {
    console.info(`retrieving the cache for ${key}`);
    const cacheData = cache.get<string>(key);
    console.info(`retrieved the cache for ${key} data: ${cacheData}`);
    return cacheData ?? null;
}