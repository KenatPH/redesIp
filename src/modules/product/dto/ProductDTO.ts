// product/dto/product.dto.ts
export class ProductDTO {
    readonly externalId: string; // ID de la API externa
    readonly product_name: string;
    readonly price_usd: number;
    readonly price_ved: number;
    readonly stock: number;
    readonly seccion: string;
    readonly sku: string;
    readonly description?: string;
}
