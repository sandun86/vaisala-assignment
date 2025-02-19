import { injectable } from 'inversify';
import { getCache, setCache } from '../utils/cache';
import { FileResponse } from '../types/file.types';
import { HTTP_CODES, MESSAGES } from '../config/variables';

@injectable()
export class FileService {

    /**
     * 
     * @param file 
     * @param uuid 
     * @returns FileResponse
     */
    async uploadFile(file: Express.Multer.File, uuid: string): Promise<FileResponse> {
        console.info(`starting to upload the file data for ${uuid}`);
        //check with the huge dataset
        const { buffer } = file;

        const jsonData = JSON.parse(buffer.toString('utf-8'));
        await setCache(uuid, JSON.stringify(jsonData));

        console.info(`data are saved and fetched for ${uuid}`);

        return { status_code: HTTP_CODES.OK, message: MESSAGES.FILE_SUCCESSFULLY_UPLOADED, data: jsonData };
    }

    /**
     * 
     * @param uuid 
     * @returns FileResponse
     */
    async getFileData(uuid: string): Promise<FileResponse> {
        console.info(`starting to get the file data for ${uuid}`);
        const fileData = await getCache(uuid);
        if (fileData) {
            console.info(`data are available for ${uuid}`);
            return { status_code: HTTP_CODES.OK, message: MESSAGES.FETCHED_SUCCESSFULLY_, data: JSON.parse(fileData) };
        }
        console.info(`data is not available for ${uuid}`);
        return { status_code: HTTP_CODES.NOT_FOUND, message: MESSAGES.NO_DATA_FOUND, data: [] };
    }
}
