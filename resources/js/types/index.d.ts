import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    notifications: Notification[];
    [key: string]: unknown;
}

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone_number: string | null;
    birth_date: string | null;
    gender: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    label: string | null;
    alt_street: string | null;
    alt_city: string | null;
    alt_state: string | null;
    alt_label: string | null;
    role: string;
    created_at: string;
    updated_at: string;
};

export type Courier = {
    id: number;
    name: string;
    license_plate: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
};

export type Product = {
    id: number;
    name: string;
    description: string | null;
    category: string;
    price_origin: number | null;
    price_discount: number;
    quantity: number;
    image: string | null;
    ingredients: string[];
    popular: boolean;
    rating: number;
    preparation_time: string | null;
    badge: string | null;
    food_type: any | null;
    created_at: string;
    updated_at: string;
};

//custom type for components
export type ProductCardProps = Pick<
    Product,
    'id' | 'name' | 'image' | 'price_discount' | 'rating' | 'category'
>;

type ProductDetailsProps = Pick<
    Product,
    | 'id'
    | 'name'
    | 'description'
    | 'category'
    | 'price_origin'
    | 'price_discount'
    | 'rating'
    | 'quantity'
    | 'image'
    | 'preparation_time'
    | 'badge'
    | 'food_type'
> & {
    user: Pick<User, 'id' | 'name' | 'email'>;
    productImages: string[];
    product: Pick<
        Product,
        'id' | 'name' | 'image' | 'price_discount' | 'rating' | 'category'
    > & {
        isFavourite: boolean;
    };
    reviews: Review[];
    suggestedProducts: ProductCardProps[];
};

export type ShopBranch = {
    id: number;
    name: string;
    address: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
};

export type Order = {
    id: number;
    user_id: number;
    shop_branch_id: number;
    courier_id: number | null;
    payment_method: string;
    status: string;
    subtotal: number;
    delivery_fee: number;
    total: number;
    confirmed_at: string | null;
    processed_at: string | null;
    estimated_delivery_at: string | null;
    delivered_at: string | null;
    created_at: string;
    updated_at: string;
};

export type OrderStatus = 'pending' | 'cooking' | 'on the way' | 'arrived';
export type PaymentStatus =
    | 'created'
    | 'pending'
    | 'paid'
    | 'failed'
    | 'expired'
    | 'canceled'
    | 'challenge'
    | 'refunded';

//new type for status
export type OrderNew = {
    id: number;
    user_id: number;
    order_items: Pick<
        Product,
        'name' | 'quantity' | 'price_discount' | 'image'
    >[];
    status: OrderStatus;
    estimated_delivery_at: number;
    street: string;
    created_at: Order['created_at'];
    total: number;
    driver_name: Courier['name'];
    driver_number: Courier['phone_number'];
    tracking_updates: TrackingUpdate[];
};

export type TrackingUpdate = {
    status: OrderStatus;
    time: string;
    message: string;
};

// =========

export type OrderDetail = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
};

export type Transaction = {
    id: number;
    order_id: number;
    transaction_status: string;
    amount: number;
    payment_gateway_reference: string | null;
    created_at: string;
    updated_at: string;
};

export type Review = {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    type: string | null;
    description: string;
    created_at: string;
    updated_at: string;
};

export type ReviewProps = Array<
    Pick<User, 'name'> &
        Pick<Review, 'user_id' | 'rating' | 'created_at' | 'description'>
>;

export type Notification = {
    id: number;
    title: string;
    message: string;
    time: string;
    unread: boolean;
};

export type CartItem = {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    product: Product;
};

export type Cart = {
    id: number;
    user_id: number;
    updated_at: string;
    created_at: string;
    items: CartItem[];
};
