import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/entities/Notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
    ) { }

    async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const notification = this.notificationRepository.create({
            ...createNotificationDto,
            createdAt: new Date(),
        });
        return this.notificationRepository.save(notification);
    }

    async getUserNotifications(userId: string): Promise<Notification[]> {
        return this.notificationRepository.find({ where: { userId } });
    }

    async markAsRead(notificationId: string): Promise<Notification> {
        const notification = await this.notificationRepository.findOne({ where: { _id: new ObjectId(notificationId) } });
        if (!notification) {
            throw new NotFoundException(`Notificación con ID ${notificationId} no encontrada`);
        }
        notification.isRead = true;
        return this.notificationRepository.save(notification);
    }
}
