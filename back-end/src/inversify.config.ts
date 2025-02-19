import { Container } from 'inversify';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';

const container = new Container();

// Bind services and controllers to the container
container.bind<FileController>(FileController).to(FileController);
container.bind<FileService>(FileService).to(FileService);

export { container };
