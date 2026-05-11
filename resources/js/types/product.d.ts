import { Review } from './review';
import { UserInfo } from './user';

export type Product = {
    id: number;
    name: string;
    quantity?: number;
    description?: string;
    foodType?: string[];
    priceDiscount: number;
    priceOrigin?: number;
    image: string;
    category: string;
    popular?: boolean;
    rating?: number;
    preparationTime?: string;
    badge?: string;
    reviews?: Review[];
};

export type userPersonalProduct = {
    userInformation: UserInfo;
    isFavourite: boolean;
    onToggleFavorite: (id: number | string) => void;
    onAddToCart: (product: {
        id: number | string;
        name: string;
        image: string;
        priceDiscount: number;
        rating: number;
        category: string;
    }) => void;
};

export type ProductCardProps = Pick<
    Product,
    'id' | 'name' | 'image' | 'priceDiscount' | 'rating' | 'category'
> &
    Pick<userPersonalProduct, 'isFavourite'>;
