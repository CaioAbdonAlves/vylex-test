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
import { CreatePlanDTO } from 'src/application/dtos/plans/create-plan.dto';
import { PlanService } from 'src/application/services/plan.service';

@Injectable()
@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: 'Create plans' })
  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPlan(@Body() createPlanDto: CreatePlanDTO) {
    return this.planService.createPlan(createPlanDto);
  }
}
