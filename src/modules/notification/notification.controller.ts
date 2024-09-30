import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva notificación' })
    async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationService.createNotification(createNotificationDto);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Obtener notificaciones de un usuario' })
    async getUserNotifications(@Param('userId') userId: string) {
        return this.notificationService.getUserNotifications(userId);
    }

    @Post(':id/read')
    @ApiOperation({ summary: 'Marcar notificación como leída' })
    async markAsRead(@Param('id') notificationId: string) {
        return this.notificationService.markAsRead(notificationId);
    }
}
