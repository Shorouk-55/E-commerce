import { count } from 'console';
export interface Cart {
    _id: string;
    cartOwner: string;
    products: Product2[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}
export class CartModel implements Cart {
    _id: string = ''
    cartOwner: string = ''
    products: Product2[] = [new Product2Model()]
    createdAt: string = ''
    updatedAt: string = ''
    __v: number = 0
    totalCartPrice: number = 0

}
export class Product2Model {
    count: number = 0
    _id: string = ''
    product: Product = new ProductModel()
    price: number = 0
}
export interface Product2 {
    count: number;
    _id: string;
    product: Product;
    price: number;
}

export class ProductModel {
    subcategory: Subcategory[] = [new SubcategoryModel()]
    _id: string = ''
    title: string = ''
    quantity: number = 0
    imageCover: string = ''
    category: Category = new CategoryModel()
    brand: Category = new CategoryModel()
    ratingsAverage: number = 0
    id: string = ''
}
export interface Product {
    subcategory: Subcategory[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Category;
    ratingsAverage: number;
    id: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}
export class CategoryModel {
    _id: string = ''
    name: string = ''
    slug: string = ''
    image: string = ''
}

export class SubcategoryModel {
    _id: string = ''
    name: string = ''
    slug: string = ''
    category: string = ''
}
export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}