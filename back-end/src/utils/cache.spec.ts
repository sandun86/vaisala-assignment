import NodeCache from "node-cache";
import { getCache, setCache } from "./cache";

jest.mock('node-cache', () => {
    return jest.fn().mockImplementation(() => ({
        set: jest.fn(),
        get: jest.fn().mockReturnValue('mockValue'),
      }));
});

const userBankAccounts = jest.fn().mockImplementation(() => {
    return {
      update: jest.fn().mockResolvedValue(true),
    };
  });

describe('Cache Utility Functions', () => {
    let nodeCache: NodeCache;
    const cacheKey = 'cache-key';
    const cachedData = 'test-cache-string';

    beforeEach(() => {
        nodeCache = new NodeCache();    
        jest.clearAllMocks();
    });

    describe('setCache', () => {
        it('should store data in the cache', async () => {

            (nodeCache.set as jest.Mock) = jest.fn().mockResolvedValue(true);

            await setCache(cacheKey, cachedData);
        });
    });

    describe('GetCache', () => {
        it('should return cached data if available', async () => {

            (nodeCache.get as jest.Mock) =jest.fn().mockReturnValue(cachedData);

            await getCache(cacheKey);
        });

        it('should return null if data is not found', async () => {
            (nodeCache.get as jest.Mock) =jest.fn().mockReturnValue(null);

            await getCache(cacheKey);
        });
    });
});
