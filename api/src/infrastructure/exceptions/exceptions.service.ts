import { IException } from '@domain/exceptions/exceptions.interface';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ExceptionsService implements IException {
  public notFoundException(meassage: string): void {
    throw new NotFoundException(meassage);
  }

  public conflictException(meassage: string): void {
    throw new ConflictException(meassage);
  }

  public badRequestException(meassage: string): void {
    throw new BadRequestException(meassage);
  }

  public internalServerErrorException(meassage: string): void {
    throw new InternalServerErrorException(meassage);
  }

  public forbiddenException(meassage: string): void {
    throw new ForbiddenException(meassage);
  }

  public unauthorizedException(meassage: string): void {
    throw new UnauthorizedException(meassage);
  }
}
