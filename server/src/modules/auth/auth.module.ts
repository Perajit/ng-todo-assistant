import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// FIXME: To be removed after integration with LINE api
import { FakeLineApiController } from './fake-line-api/fake-line-api.controller';

@Module({
  controllers: [
    AuthController,
    FakeLineApiController
  ],
  imports: [HttpModule],
  providers: [AuthService]
})
export class AuthModule { }
