import { Injectable } from '@nestjs/common';
import { add } from '@aio/sample-lib';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Master-API!' + add(999, 111);
  }
}
