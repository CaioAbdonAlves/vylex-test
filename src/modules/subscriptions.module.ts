import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionService } from 'src/application/services/subscription.service';
import {
  Subscription,
  SubscriptionSchema,
} from 'src/domain/schemas/subscription.schema';
import { MongoSubscriptionRepository } from 'src/infrastructure/mongodb/subscription/mongo-subscription.repository';
import { SubscriptionsController } from 'src/interfaces/controllers/subscriptions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  controllers: [SubscriptionsController],
  providers: [MongoSubscriptionRepository, SubscriptionService],
  exports: [MongoSubscriptionRepository],
})
export class SubscriptionsModule {}
