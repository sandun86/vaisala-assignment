import { HTTP_CODES } from '../config/variables';
import { getCache, setCache } from '../utils/cache';
import { FileService } from '../services/file.service';
import { FileResponse } from "../types/file.types";

// Mock the dependencies
jest.mock('../utils/cache', () => {
    return {
        getCache: jest.fn(),
        setCache: jest.fn(),
    };
});

describe("File Service", () => {
    let fileService: FileService;

    afterEach(() => {
        jest.clearAllMocks();
    });

    const testUuid = 'test-uuid';

    const mockFile = {
        buffer: Buffer.from(JSON.stringify({ key: 'json-file-values' }))
    } as Express.Multer.File;

    beforeEach(() => {
        fileService = new FileService();
        jest.clearAllMocks();
    });

    describe("UploadFile", () => {
        it('should return file data and set cache', async () => {

            const result: FileResponse = await fileService.uploadFile(mockFile, testUuid);

            expect(setCache).toHaveBeenCalledWith(testUuid, JSON.stringify({ key: 'json-file-values' }));
            expect(result.status_code).toEqual(HTTP_CODES.OK);
        });
    });

    describe("GetFileData", () => {
        it('should return null data response if cached data not available', async () => {
            (getCache as jest.Mock) = jest.fn().mockResolvedValue(null);

            const result: FileResponse = await fileService.getFileData(testUuid);

            expect(result.status_code).toEqual(HTTP_CODES.NOT_FOUND);
        });

        it('should return cached data if available', async () => {
            const cachedData = JSON.stringify([
                {
                    "city": "Tampere",
                    "lat": "61.4981",
                    "lon": "23.7608",
                    "temp": "-2.0"
                }]);

            (getCache as jest.Mock) = jest.fn().mockResolvedValue(cachedData);

            const result: FileResponse = await fileService.getFileData(testUuid);

            expect(result.status_code).toEqual(HTTP_CODES.OK);
        });
    });
});
