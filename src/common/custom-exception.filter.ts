import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    console.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException ?
        exception.getStatus() :
        HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;

    let error;
    if (exceptionResponse) {
      error = typeof exceptionResponse === 'string' ?
        { message: exceptionResponse } :
        // eslint-disable-next-line @typescript-eslint/ban-types
        (exceptionResponse as object);
    } else {
      error = {
        message: exception.message
      };
    }

    response.status(status);
    response.send({
      ...error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    });

  }
}
