import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanDTO } from 'src/application/dtos/plans/create-plan.dto';
import { PlanRepository } from 'src/domain/repositories/plan.repository';
import { Plan } from 'src/domain/schemas/plan.schema';

@Injectable()
export class MongoPlanRepository implements PlanRepository {
  constructor(@InjectModel(Plan.name) private planModel: Model<Plan>) {}

  async create(plan: CreatePlanDTO): Promise<Plan> {
    return this.planModel.create(plan);
  }
}
