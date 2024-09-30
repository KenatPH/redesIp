import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('notifications')
export class Notification {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: string; // ID del usuario que recibe la notificación

    @Column()
    message: string; // Mensaje de la notificación

    @Column()
    createdAt: Date; // Fecha de creación de la notificación

    @Column({ default: false })
    isRead: boolean; // Estado de lectura de la notificación
    
}
