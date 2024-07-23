import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanService } from 'src/application/services/plan.service';
import { Plan, PlanSchema } from 'src/domain/schemas/plan.schema';
import { MongoPlanRepository } from 'src/infrastructure/mongodb/plan/mongo-plan.repository';
import { PlansController } from 'src/interfaces/controllers/plans.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
  ],
  controllers: [PlansController],
  providers: [MongoPlanRepository, PlanService],
  exports: [PlanService],
})
export class PlansModule {}
