import { Product } from '../entities/Product';

export const products: Product[] = [
    new Product('3', 'Sony WH-1000XM5 Headphones', 'SKU003', 348, 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg'),
    new Product('7', 'Nintendo Switch Console', 'SKU007', 299, 'https://m.media-amazon.com/images/I/61-PblYntsL._SL1500_.jpg'),

    // Alternative image URLs
    new Product('1', 'Apple iPhone 14', 'SKU001', 799, 'https://m.media-amazon.com/images/I/61XO4bORHUL._AC_SL1500_.jpg'),
    new Product('4', 'Dell XPS 13 Laptop', 'SKU004', 1200, 'https://m.media-amazon.com/images/I/71V--WZVUIL._AC_SL1500_.jpg'),
    new Product('5', 'Apple MacBook Air M2', 'SKU005', 1249, 'https://m.media-amazon.com/images/I/710TJuHTMhL._AC_SL1500_.jpg')
]
