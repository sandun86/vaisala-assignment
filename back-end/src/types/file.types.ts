export interface JSONFileData {
    latitude: number;
    longitude: number;
    temperature: number;
}

type FileData = JSONFileData[];

export interface FileResponse {
    status_code: number; 
    data: FileData;
    message: string;
}