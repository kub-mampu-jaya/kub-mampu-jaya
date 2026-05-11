import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Camera, Edit2, MapPin, Save, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

type UserProfilePageProps = {
    user: User;
};

export default function UserProfilePage({ user }: UserProfilePageProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPayment, setIsEditingPayment] = useState(false);

    const [profileData, setProfileData] = useState<User>(user);
    console.log(profileData);

    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: 'card',
            cardNumber: '**** **** **** 4532',
            cardHolder: 'Rajesh Kumar',
            expiry: '12/26',
            isDefault: true,
        },
    ]);

    const handleInputChange = (field: keyof User, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };
    const handleInputDateChange = (field: keyof User, value: string) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddPaymentMethod = () => {
        const newId = Math.max(...paymentMethods.map((pm) => pm.id), 0) + 1;
        setPaymentMethods([
            ...paymentMethods,
            {
                id: newId,
                type: 'card',
                cardNumber: '',
                cardHolder: '',
                expiry: '',
                isDefault: false,
            },
        ]);
    };

    const handleRemovePaymentMethod = (id: number) => {
        setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend/database
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');
        router.post('/profile', profileData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
        });
        console.log(profileData);
        alert('Profile updated successfully!');
    };

    const handleSavePayment = () => {
        setIsEditingPayment(false);
        alert('Payment methods updated successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="mb-2 text-[#FF6900] hover:underline"
                    >
                        ← Back to Home
                    </Link>
                    <h1
                        className="text-[32px] text-gray-900"
                        style={{ fontWeight: 700 }}
                    >
                        My Profile
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Manage your personal information and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                {/* Profile Picture */}
                                <div className="relative mb-4">
                                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-[#FF6900] bg-gradient-to-br from-orange-100 to-yellow-100">
                                        <UserIcon className="h-16 w-16 text-[#FF6900]" />
                                    </div>
                                    <button className="absolute right-0 bottom-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6900] text-white shadow-lg transition-colors hover:bg-[#E55D00]">
                                        <Camera className="h-5 w-5" />
                                    </button>
                                </div>

                                <h2
                                    className="mb-1 text-[20px] text-gray-900"
                                    style={{ fontWeight: 600 }}
                                >
                                    {profileData.name}
                                </h2>
                                <p className="mb-3 text-[14px] text-gray-500">
                                    {profileData.email}
                                </p>

                                <div className="w-full space-y-3 border-t border-gray-100 pt-4">
                                    <div className="flex items-center justify-between text-[14px]">
                                        <span className="text-gray-600">
                                            Total Orders
                                        </span>
                                        <span
                                            className="text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            24
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="mt-4 rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-5 shadow-sm">
                            <h3
                                className="mb-3 text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <button className="w-full rounded-lg border border-orange-200 bg-white px-4 py-2.5 text-left text-[14px] text-gray-700 transition-colors hover:bg-orange-50">
                                    Saved Addresses
                                </button>
                                <button className="w-full rounded-lg border border-orange-200 bg-white px-4 py-2.5 text-left text-[14px] text-gray-700 transition-colors hover:bg-orange-50">
                                    Payment Methods
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Profile Information Form */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Personal Information */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                        <UserIcon className="h-5 w-5 text-[#FF6900]" />
                                    </div>
                                    <div>
                                        <h2
                                            className="text-[20px] text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Personal Information
                                        </h2>
                                        <p className="text-[14px] text-gray-500">
                                            Update your personal details
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() =>
                                        isEditing
                                            ? handleSave()
                                            : setIsEditing(true)
                                    }
                                    className={
                                        isEditing
                                            ? 'bg-[#FF6900] text-white hover:bg-[#E55D00]'
                                            : 'border-[#FF6900] text-[#FF6900] hover:bg-orange-50'
                                    }
                                    variant={isEditing ? 'default' : 'outline'}
                                >
                                    {isEditing ? (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit Profile
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label
                                        htmlFor="fullName"
                                        className="mb-2 text-gray-700"
                                    >
                                        Full Name
                                    </Label>
                                    <Input
                                        id="fullName"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="mb-2 text-gray-700"
                                    >
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="phone"
                                        className="mb-2 text-gray-700"
                                    >
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={profileData.phone_number ?? ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'phone_number',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="dateOfBirth"
                                        className="mb-2 text-gray-700"
                                    >
                                        Date of Birth
                                    </Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={
                                            profileData.birth_date?.split(
                                                'T',
                                            )[0] ?? ''
                                        }
                                        onChange={(e) =>
                                            handleInputDateChange(
                                                'birth_date',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label
                                        htmlFor="gender"
                                        className="mb-2 text-gray-700"
                                    >
                                        Gender
                                    </Label>
                                    <div className="mt-2 flex gap-4">
                                        <label className="flex cursor-pointer items-center gap-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={
                                                    profileData.gender ===
                                                    'male'
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'gender',
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={!isEditing}
                                                className="accent-[#FF6900]"
                                            />
                                            <span className="text-gray-700">
                                                Male
                                            </span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={
                                                    profileData.gender ===
                                                    'female'
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'gender',
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={!isEditing}
                                                className="accent-[#FF6900]"
                                            />
                                            <span className="text-gray-700">
                                                Female
                                            </span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={
                                                    profileData.gender ===
                                                    'other'
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'gender',
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={!isEditing}
                                                className="accent-[#FF6900]"
                                            />
                                            <span className="text-gray-700">
                                                Other
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Address Information */}
                        <Card
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                            id="address-section"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                        <MapPin className="h-5 w-5 text-[#FF6900]" />
                                    </div>
                                    <div>
                                        <h2
                                            className="text-[20px] text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Address Information
                                        </h2>
                                        <p className="text-[14px] text-gray-500">
                                            Update your default delivery address
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() =>
                                        isEditing
                                            ? handleSave()
                                            : setIsEditing(true)
                                    }
                                    className={
                                        isEditing
                                            ? 'bg-[#FF6900] text-white hover:bg-[#E55D00]'
                                            : 'border-[#FF6900] text-[#FF6900] hover:bg-orange-50'
                                    }
                                    variant={isEditing ? 'default' : 'outline'}
                                >
                                    {isEditing ? (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit Address
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label
                                        htmlFor="address"
                                        className="mb-2 text-gray-700"
                                    >
                                        Street Address
                                    </Label>
                                    <Input
                                        id="address"
                                        value={profileData.street ?? ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'street',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="city"
                                        className="mb-2 text-gray-700"
                                    >
                                        City
                                    </Label>
                                    <Input
                                        id="city"
                                        value={profileData.city ?? ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'city',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="state"
                                        className="mb-2 text-gray-700"
                                    >
                                        State
                                    </Label>
                                    <Input
                                        id="state"
                                        value={profileData.state ?? ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'state',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Second Address */}
                            <Separator className="my-6" />
                            <div className="mb-4">
                                <h3
                                    className="mb-2 text-gray-900"
                                    style={{ fontWeight: 600 }}
                                >
                                    Secondary Address (Optional)
                                </h3>
                                <p className="text-[14px] text-gray-500">
                                    Add an alternative delivery address
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label
                                        htmlFor="address2"
                                        className="mb-2 text-gray-700"
                                    >
                                        Street Address
                                    </Label>
                                    <Input
                                        id="address2"
                                        value={profileData.alt_street ?? ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'alt_street',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                        placeholder="Enter secondary address"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="city2"
                                        className="mb-2 text-gray-700"
                                    >
                                        City
                                    </Label>
                                    <Input
                                        id="city2"
                                        value={profileData.alt_city ?? ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'alt_city',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                        placeholder="Enter city"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="state2"
                                        className="mb-2 text-gray-700"
                                    >
                                        State
                                    </Label>
                                    <Input
                                        id="state2"
                                        value={profileData.alt_state ?? ''}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'alt_state',
                                                e.target.value,
                                            )
                                        }
                                        disabled={!isEditing}
                                        className="mt-1"
                                        placeholder="Enter state"
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Payment Methods */}
                        {/* <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                        <CreditCard className="h-5 w-5 text-[#FF6900]" />
                                    </div>
                                    <div>
                                        <h2
                                            className="text-[20px] text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Payment Methods
                                        </h2>
                                        <p className="text-[14px] text-gray-500">
                                            Manage your payment methods
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() =>
                                        isEditingPayment
                                            ? handleSavePayment()
                                            : setIsEditingPayment(true)
                                    }
                                    className={
                                        isEditingPayment
                                            ? 'bg-[#FF6900] text-white hover:bg-[#E55D00]'
                                            : 'border-[#FF6900] text-[#FF6900] hover:bg-orange-50'
                                    }
                                    variant={
                                        isEditingPayment ? 'default' : 'outline'
                                    }
                                >
                                    {isEditingPayment ? (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit Payment Methods
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {paymentMethods.map((pm) => (
                                    <div
                                        key={pm.id}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                                    >
                                        <div>
                                            <p
                                                className="text-gray-900"
                                                style={{ fontWeight: 600 }}
                                            >
                                                Card
                                            </p>
                                            <p className="text-[14px] text-gray-500">
                                                {pm.cardNumber}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={pm.isDefault}
                                                className="h-5 w-5 accent-[#FF6900]"
                                                disabled={!isEditingPayment}
                                                onChange={(e) => {
                                                    setPaymentMethods(
                                                        paymentMethods.map(
                                                            (p) => ({
                                                                ...p,
                                                                isDefault:
                                                                    p.id ===
                                                                    pm.id
                                                                        ? e
                                                                              .target
                                                                              .checked
                                                                        : false,
                                                            }),
                                                        ),
                                                    );
                                                }}
                                            />
                                            <span className="text-gray-700">
                                                Default
                                            </span>
                                            {isEditingPayment && (
                                                <button
                                                    onClick={() =>
                                                        handleRemovePaymentMethod(
                                                            pm.id,
                                                        )
                                                    }
                                                    className="ml-2 text-[14px] text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                                    <div>
                                        <p
                                            className="text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Add New Card
                                        </p>
                                        <p className="text-[14px] text-gray-500">
                                            Add a new payment method
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleAddPaymentMethod}
                                        className="bg-[#FF6900] text-white hover:bg-[#E55D00]"
                                        disabled={!isEditingPayment}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Card
                                    </Button>
                                </div>
                            </div>
                        </Card> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
