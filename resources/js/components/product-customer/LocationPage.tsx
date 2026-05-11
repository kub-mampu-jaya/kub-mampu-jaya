import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
// import { User } from '@/types';
import {
    Briefcase,
    Check,
    ChevronRight,
    Home,
    MapPin,
    Navigation,
    Search,
} from 'lucide-react';
import { useState } from 'react';

interface LocationPageProps {
    // user: User;
    onNavigateToCheckout: () => void;
    onNavigateToHome: () => void;
}

interface SavedAddress {
    id: number;
    type: string;
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    isDefault: boolean;
}

export function LocationPage({
    // user,
    onNavigateToCheckout,
    onNavigateToHome,
}: LocationPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
        1,
    );
    const [detectingLocation, setDetectingLocation] = useState(false);

    // Form states: Variabel area diubah menjadi street
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        addressType: 'home',
    });

    // const initialAddresses: SavedAddress[] = !(
    //     user.alt_street &&
    //     user.alt_city &&
    //     user.alt_label &&
    //     user.alt_state
    // )
    //     ? [
    //           {
    //   id: 1,
    //   type: user.label,
    //   name: user.name,
    //   address: user.street,
    //   city: user.city,
    //   state: user.state,
    //   phone: user.phone_number,
    //   isDefault: true,
    //           },
    //       ]
    //     : [
    //           {
    //               id: 1,
    //               type: user.label,
    //               name: user.name,
    //               address: user.street,
    //               city: user.city,
    //               state: user.state,
    //               phone: user.phone_number,
    //               isDefault: true,
    //           },
    //             {
    //                 id: 2,
    //                 type: user.alt_label,
    //                 name: user.name,
    //                 address: user.alt_street,
    //                 city: user.alt_city,
    //                 state: user.alt_state,
    //                 phone: user.phone_number,
    //                 isDefault: false,
    //             },
    //       ];
    const initialAddresses: SavedAddress[] = [
        {
            id: 1,
            type: 'Rumah',
            name: 'Amalia Wahyuni',
            address: 'Jalan Ahmad Yani, no. 4',
            city: 'Jakarta',
            state: 'Jakarta',
            phone: '(+62) 941 1200 821',
            isDefault: true,
        },
        {
            id: 2,
            type: 'Kantor',
            name: 'Usyi Syahrini Maryati',
            address: 'Jalan Ketintang Selatan, no. 2',
            city: 'Jakarta',
            state: 'Jakarta',
            phone: '(+62) 941 1344 821',
            isDefault: false,
        },
    ];

    const [savedAddresses, setSavedAddresses] =
        useState<SavedAddress[]>(initialAddresses);

    const recentSearches = [
        'Green Park Colony, Mumbai',
        'Andheri East, Mumbai',
        'Bandra West, Mumbai',
    ];

    const detectCurrentLocation = () => {
        setDetectingLocation(true);
        setTimeout(() => {
            setDetectingLocation(false);
            setSearchQuery('Current Location: Powai, Mumbai');
        }, 1500);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const saveNewAddress = () => {
        // Validasi diperbarui: mengecek street, bukan area
        if (
            !formData.name ||
            !formData.phone ||
            !formData.street || // Updated
            !formData.city ||
            !formData.state
        ) {
            alert('Please fill all required fields');
            return;
        }

        const newAddress: SavedAddress = {
            id: savedAddresses.length + 1,
            type: formData.addressType,
            name: formData.name,
            address: formData.street, // Updated: Menggunakan street
            city: formData.city,
            state: formData.state,
            phone: formData.phone,
            isDefault: savedAddresses.length === 0,
        };

        setSavedAddresses([...savedAddresses, newAddress]);
        setShowAddressForm(false);
        setFormData({
            name: '',
            phone: '',
            street: '', // Updated reset state
            city: '',
            state: '',
            addressType: 'home',
        });
    };

    const deleteAddress = (id: number) => {
        setSavedAddresses(savedAddresses.filter((addr) => addr.id !== id));
        if (selectedAddressId === id) {
            setSelectedAddressId(savedAddresses[0]?.id || null);
        }
    };

    const setAsDefault = (id: number) => {
        setSavedAddresses((addresses) =>
            addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            })),
        );
    };

    const getAddressIcon = (type: string) => {
        switch (type) {
            case 'home':
                return <Home className="h-5 w-5" />;
            case 'work':
                return <Briefcase className="h-5 w-5" />;
            default:
                return <MapPin className="h-5 w-5" />;
        }
    };

    const getAddressColor = (type: string) => {
        switch (type) {
            case 'home':
                return 'text-[#059669] bg-green-100';
            case 'work':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-[#D97706] bg-orange-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <button
                        onClick={onNavigateToCheckout}
                        className="mb-2 text-[#059669] hover:underline"
                    >
                        ← Back to Checkout
                    </button>
                    <h1
                        className="text-[32px] text-gray-900"
                        style={{ fontWeight: 700 }}
                    >
                        Select Delivery Location
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Choose where you want your order delivered
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Left Column - Location Search & Saved Addresses */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Location Search */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2
                                className="mb-4 text-[20px] text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Find Your Location
                            </h2>

                            {/* Current Location Button */}
                            <Button
                                onClick={detectCurrentLocation}
                                disabled={detectingLocation}
                                className="mb-4 w-full justify-start gap-3 bg-gradient-to-r from-[#059669] to-[#047857] py-6 text-white hover:from-[#047857] hover:to-[#059669]"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                    <Navigation className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p style={{ fontWeight: 600 }}>
                                        {detectingLocation
                                            ? 'Detecting Location...'
                                            : 'Use Current Location'}
                                    </p>
                                    <p className="text-[13px] text-white/80">
                                        Enable location access for better
                                        experience
                                    </p>
                                </div>
                            </Button>

                            {/* Search Bar */}
                            <div className="relative mb-4">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search for area, street name..."
                                    className="border-2 border-gray-200 py-6 pl-12 text-[16px] focus:border-[#059669]"
                                />
                            </div>

                            {/* Recent Searches */}
                            {!searchQuery && (
                                <div className="space-y-2">
                                    <p className="mb-2 text-[14px] text-gray-600">
                                        Recent Searches
                                    </p>
                                    {recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSearchQuery(search)
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-gray-50"
                                        >
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-700">
                                                {search}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Saved Addresses */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2
                                    className="text-[20px] text-gray-900"
                                    style={{ fontWeight: 600 }}
                                >
                                    Saved Addresses ({savedAddresses.length})
                                </h2>
                                <Button
                                    onClick={() =>
                                        setShowAddressForm(!showAddressForm)
                                    }
                                    variant="outline"
                                    className="border-[#059669] text-[#059669] hover:bg-green-50"
                                >
                                    {showAddressForm ? 'Cancel' : '+ Add New'}
                                </Button>
                            </div>

                            {/* Add Address Form */}
                            {showAddressForm && (
                                <div className="mb-6 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-yellow-50 p-5">
                                    <h3
                                        className="mb-4 text-[18px] text-gray-900"
                                        style={{ fontWeight: 600 }}
                                    >
                                        Add New Address
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label htmlFor="name">
                                                    Full Name *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Enter your name"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone">
                                                    Phone Number *
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'phone',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="+91 98765 43210"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        {/* Updated Field: Street */}
                                        <div>
                                            <Label htmlFor="street">
                                                Street *
                                            </Label>
                                            <Input
                                                id="street"
                                                value={formData.street}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'street',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Sector 12, Park Avenue"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label htmlFor="city">
                                                    City *
                                                </Label>
                                                <Input
                                                    id="city"
                                                    value={formData.city}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'city',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Mumbai"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="state">
                                                    State *
                                                </Label>
                                                <Input
                                                    id="state"
                                                    value={formData.state}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'state',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Maharashtra"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Address Type</Label>
                                            <div className="mt-2 flex gap-3">
                                                {(
                                                    [
                                                        'home',
                                                        'work',
                                                        'other',
                                                    ] as const
                                                ).map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() =>
                                                            handleInputChange(
                                                                'addressType',
                                                                type,
                                                            )
                                                        }
                                                        className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 transition-colors ${
                                                            formData.addressType ===
                                                            type
                                                                ? 'border-[#059669] bg-green-50 text-[#059669]'
                                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        {getAddressIcon(type)}
                                                        <span className="capitalize">
                                                            {type}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                onClick={saveNewAddress}
                                                className="flex-1 bg-[#059669] text-white hover:bg-[#047857]"
                                            >
                                                Save Address
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setShowAddressForm(false)
                                                }
                                                variant="outline"
                                                className="border-gray-300"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Saved Address List */}
                            <div className="space-y-3">
                                {savedAddresses.map((address) => (
                                    <div
                                        key={address.id}
                                        className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                                            selectedAddressId === address.id
                                                ? 'border-[#059669] bg-green-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                        onClick={() =>
                                            setSelectedAddressId(address.id)
                                        }
                                    >
                                        {selectedAddressId === address.id && (
                                            <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#059669]">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                        )}

                                        <div className="flex items-start gap-3 pr-8">
                                            <div
                                                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${getAddressColor(
                                                    address.type,
                                                )}`}
                                            >
                                                {getAddressIcon(address.type)}
                                            </div>

                                            <div className="flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span
                                                        className="text-gray-900 capitalize"
                                                        style={{
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {address.type}
                                                    </span>
                                                    {address.isDefault && (
                                                        <Badge className="bg-[#D97706] text-[11px] text-white">
                                                            Default
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="mb-1 text-gray-900">
                                                    {address.name}
                                                </p>
                                                <p className="mb-1 text-[14px] text-gray-600">
                                                    {address.phone}
                                                </p>
                                                <p className="text-[14px] text-gray-600">
                                                    {address.address}
                                                </p>
                                                <p className="text-[14px] text-gray-600">
                                                    {address.city},{' '}
                                                    {address.state}
                                                </p>

                                                <div className="mt-3 flex gap-3">
                                                    {!address.isDefault && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setAsDefault(
                                                                    address.id,
                                                                );
                                                            }}
                                                            className="text-[14px] text-[#059669] hover:underline"
                                                        >
                                                            Set as Default
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteAddress(
                                                                address.id,
                                                            );
                                                        }}
                                                        className="text-[14px] text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Delivery Info & Action */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Delivery Info Card */}
                            <Card className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <MapPin className="h-6 w-6 text-[#059669]" />
                                    </div>
                                    <div>
                                        <h3
                                            className="text-[18px] text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Quick Delivery
                                        </h3>
                                        <p className="text-[13px] text-gray-500">
                                            to your doorstep
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#059669]">
                                            <span className="text-[11px] text-white">
                                                ✓
                                            </span>
                                        </div>
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                Free Delivery
                                            </p>
                                            <p className="text-[13px] text-gray-600">
                                                on orders above ₹299
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#059669]">
                                            <span className="text-[11px] text-white">
                                                ✓
                                            </span>
                                        </div>
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                Fast Delivery
                                            </p>
                                            <p className="text-[13px] text-gray-600">
                                                within 2-3 business days
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#059669]">
                                            <span className="text-[11px] text-white">
                                                ✓
                                            </span>
                                        </div>
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                Safe Packaging
                                            </p>
                                            <p className="text-[13px] text-gray-600">
                                                100% secure delivery
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Selected Address Summary */}
                            {selectedAddressId && (
                                <Card className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-yellow-50 p-5">
                                    <h3
                                        className="mb-3 text-[16px] text-gray-900"
                                        style={{ fontWeight: 600 }}
                                    >
                                        Selected Address
                                    </h3>
                                    {savedAddresses
                                        .filter(
                                            (addr) =>
                                                addr.id === selectedAddressId,
                                        )
                                        .map((address) => (
                                            <div
                                                key={address.id}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full ${getAddressColor(
                                                            address.type,
                                                        )}`}
                                                    >
                                                        {getAddressIcon(
                                                            address.type,
                                                        )}
                                                    </div>
                                                    <span
                                                        className="text-gray-900 capitalize"
                                                        style={{
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {address.type}
                                                    </span>
                                                </div>
                                                <p className="text-[14px] text-gray-700">
                                                    {address.name}
                                                </p>
                                                <p className="text-[13px] text-gray-600">
                                                    {address.address}
                                                </p>
                                                <p className="text-[13px] text-gray-600">
                                                    {address.city},{' '}
                                                    {address.state}
                                                </p>
                                            </div>
                                        ))}
                                </Card>
                            )}

                            {/* Action Button */}
                            <Button
                                onClick={onNavigateToCheckout}
                                disabled={!selectedAddressId}
                                className="w-full bg-[#D97706] py-6 text-[16px] text-white hover:bg-[#B45309]"
                                style={{ fontWeight: 600 }}
                            >
                                Deliver to this Address
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>

                            {/* Service Areas Info */}
                            <Card className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                                <p
                                    className="mb-2 text-[13px] text-blue-900"
                                    style={{ fontWeight: 600 }}
                                >
                                    📍 We deliver across India
                                </p>
                                <p className="text-[12px] text-blue-700">
                                    Currently serving 500+ cities. Check
                                    availability at checkout.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
