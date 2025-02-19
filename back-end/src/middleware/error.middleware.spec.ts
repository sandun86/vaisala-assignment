import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./error.middleware";
import { HTTP_CODES } from "../config/variables";

describe("errorHandler middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockReq = {};
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockRes = {
            status: mockStatus,
        };
        mockNext = jest.fn();
    });

    it("should log the error stack and return a 500 status", () => {
        const mockError = new Error("Test error");
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();

        // Action
        errorHandler(mockError, mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockStatus).toHaveBeenCalledWith(HTTP_CODES.SERVER_ERROR);

        // Cleanup
        consoleSpy.mockRestore();
    });

    it("should not call next", () => {
        const mockError = new Error("Test error");

        // Action
        errorHandler(mockError, mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
    });
});
