type AddressInfo = {
    street: string;
    city: string;
    state: string;
    label?: 'home' | 'work' | 'other';
};

export type UserInfo = {
    fullName: string;
    email: string;
    password: string;
    fullNumber: string;
    birthDate: Date;
    gender: string;
    addressInfo: AddressInfo;
    altAddressInfo?: AddressInfo;
};
