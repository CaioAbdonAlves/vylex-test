import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateSubscriptionDTO } from 'src/application/dtos/subscriptions/create-subscription.dto';
import {
  SubscriptionFilters,
  SubscriptionRepository,
} from 'src/domain/repositories/subscription.repository';
import { Plan } from 'src/domain/schemas/plan.schema';
import { Subscription } from 'src/domain/schemas/subscription.schema';
import { Theme } from 'src/domain/schemas/theme.schema';

@Injectable()
export class MongoSubscriptionRepository implements SubscriptionRepository {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<Subscription>,
  ) {}

  async create(subscription: CreateSubscriptionDTO): Promise<Subscription> {
    return this.subscriptionModel.create(subscription);
  }

  async findAll(filters: SubscriptionFilters): Promise<Subscription[]> {
    const { userId } = filters;
    const query: FilterQuery<Subscription> = {};

    if (userId) {
      query.users = userId;
    }

    return this.subscriptionModel
      .find(query)
      .populate({
        path: 'plan',
        model: Plan.name,
        select: 'themes',
        populate: { path: 'themes', select: 'name id', model: Theme.name },
      })
      .lean();
  }
}
