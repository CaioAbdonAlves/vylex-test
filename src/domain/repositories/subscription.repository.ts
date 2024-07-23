import { CreateSubscriptionDTO } from 'src/application/dtos/subscriptions/create-subscription.dto';
import { Subscription } from '../schemas/subscription.schema';

export interface SubscriptionFilters {
  userId?: number;
}
export interface SubscriptionRepository {
  create(plan: CreateSubscriptionDTO): Promise<Subscription>;
  findAll(filters: SubscriptionFilters): Promise<Subscription[]>;
}
