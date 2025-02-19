import { Request, Response } from "express";
import { FileController } from '../controllers/file.controller';
import { FileService } from '../services/file.service';
import { HTTP_CODES } from "../config/variables";

// Mock the dependencies
jest.mock('../services/file.service');

describe("File Controller", () => {
    let fileService: jest.Mocked<FileService>;
    let fileController: FileController;

    afterEach(() => {
        jest.clearAllMocks();
    });

    const req = {
        file: 'file.json',
        headers: { uuid: '123456789'},
    } as unknown as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    beforeEach(() => {
        fileService = {
            uploadFile: jest.fn(),
            getFileData: jest.fn(),
        } as unknown as jest.Mocked<FileService>;

        fileController = new FileController(fileService);
        jest.clearAllMocks();
    });

    describe("Upload", () => {
        it("should return 200 when file is uploaded successfully", async () => {
            //Mock the uploadFile function
            (fileService.uploadFile as jest.Mock) = jest.fn()
                .mockResolvedValue({ status_code: HTTP_CODES.OK, data: [], message: 'message.' });

            // Action
            await fileController.upload(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
        });

        it("should return 500 when server error", async () => {

            (fileService.uploadFile as jest.Mock) = jest.fn()
                .mockRejectedValue({ message: "system error" });

            // Action
            await fileController.upload(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(HTTP_CODES.SERVER_ERROR);
        });
    });


    describe("SwitchTemperature", () => {
        it("should return 200 when file data fetched successfully", async () => {
            //Mock the getFileData function
            (fileService.getFileData as jest.Mock) = jest.fn()
                .mockResolvedValue({ status_code: HTTP_CODES.OK, data: [], message: 'message.' });

            // Action
            await fileController.switchTemperature(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
        });

        it("should return 500 when server error", async () => {
            (fileService.getFileData as jest.Mock) = jest.fn()
                .mockRejectedValue({ message: "system error" });

            // Action
            await fileController.switchTemperature(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(HTTP_CODES.SERVER_ERROR);
        });
    });
});
