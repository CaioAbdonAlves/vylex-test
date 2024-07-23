import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { CreateSubscriptionDTO } from 'src/application/dtos/subscriptions/create-subscription.dto';

@Injectable()
@ApiTags('plans')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: 'Create subscriptions' })
  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createSubscription(@Body() dto: CreateSubscriptionDTO) {
    return this.subscriptionService.createSubscription(dto);
  }
}
