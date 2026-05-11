import {
    AudioWaveform,
    Banknote,
    Bell,
    Command,
    GalleryVerticalEnd,
    HelpCircle,
    LayoutDashboard,
    Monitor,
    Package,
    Palette,
    Settings,
    UserCog,
    Users,
    Wrench,
} from 'lucide-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
    user: {
        name: 'satnaing',
        email: 'satnaingdev@gmail.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'FNB E-Commerce',
            logo: '/images/logo-pbp.png',
            plan: 'Admin',
        },
        // {
        //     name: 'Acme Inc',
        //     logo: GalleryVerticalEnd,
        //     plan: 'Enterprise',
        // },
        // {
        //     name: 'Acme Corp.',
        //     logo: AudioWaveform,
        //     plan: 'Startup',
        // },
    ],
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: '/admin',
                    icon: LayoutDashboard,
                },
                {
                    title: 'Manajemen Produk',
                    url: '/admin/product-management',
                    icon: Package,
                },
                {
                    title: 'Manajemen Keuangan',
                    url: '/admin/cashflow-management',
                    icon: Banknote,
                },
                {
                    title: 'Manajemen Pelanggan',
                    url: '/admin/customer-management',
                    badge: '3',
                    icon: Users,
                },
            ],
        },
        // {
        //     title: 'Pages',
        //     items: [
        //         {
        //             title: 'Auth',
        //             icon: ShieldCheck,
        //             items: [
        //                 {
        //                     title: 'Sign In',
        //                     url: '/sign-in',
        //                 },
        //                 {
        //                     title: 'Sign In (2 Col)',
        //                     url: '/sign-in-2',
        //                 },
        //                 {
        //                     title: 'Sign Up',
        //                     url: '/sign-up',
        //                 },
        //                 {
        //                     title: 'Forgot Password',
        //                     url: '/forgot-password',
        //                 },
        //                 {
        //                     title: 'OTP',
        //                     url: '/otp',
        //                 },
        //             ],
        //         },
        //         {
        //             title: 'Errors',
        //             icon: Bug,
        //             items: [
        //                 {
        //                     title: 'Unauthorized',
        //                     url: '/errors/unauthorized',
        //                     icon: Lock,
        //                 },
        //                 {
        //                     title: 'Forbidden',
        //                     url: '/errors/forbidden',
        //                     icon: UserX,
        //                 },
        //                 {
        //                     title: 'Not Found',
        //                     url: '/errors/not-found',
        //                     icon: FileX,
        //                 },
        //                 {
        //                     title: 'Internal Server Error',
        //                     url: '/errors/internal-server-error',
        //                     icon: ServerOff,
        //                 },
        //                 {
        //                     title: 'Maintenance Error',
        //                     url: '/errors/maintenance-error',
        //                     icon: Construction,
        //                 },
        //             ],
        //         },
        //     ],
        // },
        {
            title: 'Other',
            items: [
                {
                    title: 'Settings',
                    icon: Settings,
                    items: [
                        {
                            title: 'Profile',
                            url: '/settings',
                            icon: UserCog,
                        },
                        {
                            title: 'Account',
                            url: '/settings/account',
                            icon: Wrench,
                        },
                        {
                            title: 'Appearance',
                            url: '/settings/appearance',
                            icon: Palette,
                        },
                        {
                            title: 'Notifications',
                            url: '/settings/notifications',
                            icon: Bell,
                        },
                        {
                            title: 'Display',
                            url: '/settings/display',
                            icon: Monitor,
                        },
                    ],
                },
                {
                    title: 'Help Center',
                    url: '/help-center',
                    icon: HelpCircle,
                },
            ],
        },
    ],
};
