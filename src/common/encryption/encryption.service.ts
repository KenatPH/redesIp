import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Clave de 32 bytes
    private readonly iv = randomBytes(16); // Vector de inicialización de 16 bytes

    encrypt(text: string): string {
        const cipher = createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${this.iv.toString('hex')}:${encrypted}`; // Almacenar IV junto con el texto cifrado
    }

    decrypt(text: string): string {
        const [iv, encryptedText] = text.split(':').map(part => Buffer.from(part, 'hex'));
        const decipher = createDecipheriv(this.algorithm, this.key, iv);

        // Decrypt the data
        let decrypted = decipher.update(encryptedText, undefined, 'utf8'); 
        decrypted += decipher.final('utf8');
        return decrypted;
    }

}
