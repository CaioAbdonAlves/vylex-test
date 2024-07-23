import { Injectable } from '@nestjs/common';
import { CreatePlanDTO } from '../dtos/plans/create-plan.dto';
import { Plan } from 'src/domain/schemas/plan.schema';
import { MongoPlanRepository } from 'src/infrastructure/mongodb/plan/mongo-plan.repository';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: MongoPlanRepository) {}

  async createPlan(createPlanDTO: CreatePlanDTO): Promise<Plan> {
    return this.planRepository.create(createPlanDTO);
  }
}
