import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { FileService } from '../services/file.service';
import { HTTP_CODES, MESSAGES } from '../config/variables';

@injectable()
export class FileController {

    private fileService: FileService;

    /**
     * constructor
     * @param fileService 
     */
    constructor(@inject(FileService) fileService: FileService) {
        this.fileService = fileService;
        this.upload = this.upload.bind(this);
        this.switchTemperature = this.switchTemperature.bind(this);
    }

    /**
     * 
     * @param req 
     * @param res  
     * @returns void
     */
    async upload(req: Request, res: Response): Promise<void> {
        try {
            console.info(`starting to upload the temperature data`);
            const uuid: string = req.headers.uuid as string;

            const temperatureData = await this.fileService.uploadFile(req.file as Express.Multer.File, uuid);

            console.info(`End the process of temperature data ${uuid}`);
            res.status(temperatureData.status_code).json({ message: temperatureData.message, data: temperatureData.data });
        } catch (error) {
            console.error(`Failed to generate csrf token ${JSON.stringify(error)}`);
            res.status(HTTP_CODES.SERVER_ERROR).json({ message: MESSAGES.TRY_AGAIN, token: null });
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async switchTemperature(req: Request, res: Response): Promise<void> {
        try {
            console.info(`Starting to process the switch temperature data`);
            const uuid: string = req.headers.uuid as string;

            const fileData = await this.fileService.getFileData(uuid);

            console.info(`End the switch temperature data for ${uuid}`);
            res.status(fileData.status_code).json({ message: fileData.message, data: fileData.data });
        } catch (err) {
            console.error(`Failed to switch to temperature`);
            res.status(HTTP_CODES.SERVER_ERROR).json({ message: MESSAGES.TRY_AGAIN, data: [] });
        }
    }
}