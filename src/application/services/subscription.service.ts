import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDTO } from '../dtos/subscriptions/create-subscription.dto';
import { Subscription } from 'src/domain/schemas/subscription.schema';
import { MongoSubscriptionRepository } from 'src/infrastructure/mongodb/subscription/mongo-subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: MongoSubscriptionRepository,
  ) {}

  async createSubscription(
    createSubscriptionDTO: CreateSubscriptionDTO,
  ): Promise<Subscription> {
    return this.subscriptionRepository.create(createSubscriptionDTO);
  }
}
