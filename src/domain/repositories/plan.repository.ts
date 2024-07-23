import { CreatePlanDTO } from 'src/application/dtos/plans/create-plan.dto';
import { Plan } from '../schemas/plan.schema';

export interface PlanRepository {
  create(plan: CreatePlanDTO): Promise<Plan>;
}
