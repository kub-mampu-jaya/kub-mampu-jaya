import { useState } from 'react';
import { Logo } from './Logo';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export function AuthInterface() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-white">
            {/* ================= SIGN IN ================= */}
            <section
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    isSignUp
                        ? 'pointer-events-none translate-x-full opacity-0'
                        : 'translate-x-0 opacity-100'
                }`}
            >
                {/* ================= SIGN IN MOBILE ================= */}
                <div className="flex min-h-screen flex-col bg-white md:hidden">
                    {/* HERO */}
                    <div className="relative flex min-h-[40vh] flex-col items-center justify-center overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-orange-400 to-orange-500 text-white">
                        <div className="absolute top-6 right-6 h-20 w-20 rounded-full bg-white/10" />
                        <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full bg-white/10" />

                        <Logo light />

                        <div className="z-10 mt-4 px-6 text-center">
                            <h2 className="mb-2 text-2xl font-bold">
                                Halo, Pelanggan !
                            </h2>
                            <p className="text-sm text-white/90">
                                silahkan masuk untuk melanjutkan
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="flex flex-1 flex-col px-6 pt-8">
                        <SignInForm />

                        {/* BUTTON FIX BOTTOM */}
                        <div className="mt-auto py-6 text-center">
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="font-semibold text-orange-500"
                            >
                                DAFTAR
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden min-h-screen grid-cols-2 md:grid">
                    {/* LEFT */}
                    <div className="relative flex flex-col justify-center px-16">
                        <div className="absolute top-8 left-8">
                            <Logo />
                        </div>
                        <SignInForm />
                    </div>

                    {/* RIGHT */}
                    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 text-white">
                        {/* ORNAMENT */}
                        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10" />
                        <div className="absolute bottom-[-100px] left-[-100px] h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute top-32 left-24 h-20 w-20 rounded-full bg-white/10" />

                        <div className="relative z-10 px-10 text-center">
                            <h2 className="mb-4 text-3xl font-bold">
                                Halo, Pelanggan!
                            </h2>
                            <p className="mb-8 text-white/90">
                                Belum mendaftar?
                                <br />
                                silahkan klik tombol di bawah ini
                            </p>
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="rounded-full border-2 border-white px-12 py-3 transition hover:bg-white/10"
                            >
                                DAFTAR
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SIGN UP ================= */}
            <section
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    isSignUp
                        ? 'translate-x-0 opacity-100'
                        : 'pointer-events-none -translate-x-full opacity-0'
                }`}
            >
                {/* ================= SIGN UP MOBILE ================= */}
                <div className="flex min-h-screen flex-col bg-white md:hidden">
                    {/* HERO */}
                    <div className="relative flex min-h-[40vh] flex-col items-center justify-center overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-orange-400 to-orange-500 text-white">
                        <div className="absolute top-6 right-6 h-20 w-20 rounded-full bg-white/10" />
                        <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full bg-white/10" />

                        <Logo light />

                        <div className="z-10 mt-4 px-6 text-center">
                            <h2 className="mb-2 text-2xl font-bold">
                                Halo Pelanggan !
                            </h2>
                            <p className="text-sm text-white/90">
                                silahkan daftar untuk melanjutkan
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="flex flex-1 flex-col px-6 pt-8">
                        <SignUpForm />

                        {/* BUTTON FIX BOTTOM */}
                        <div className="mt-auto py-6 text-center">
                            <button
                                onClick={() => setIsSignUp(false)}
                                className="font-semibold text-orange-500"
                            >
                                MASUK
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden min-h-screen grid-cols-2 md:grid">
                    {/* LEFT */}
                    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 text-white">
                        {/* ORNAMENT */}
                        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10" />
                        <div className="absolute right-[-100px] bottom-[-100px] h-80 w-80 rounded-full bg-white/10" />

                        <div className="absolute top-8 left-8">
                            <Logo light />
                        </div>

                        <div className="relative z-10 px-10 text-center">
                            <h2 className="mb-4 text-3xl font-bold">
                                Halo Pelanggan!
                            </h2>
                            <p className="mb-8 text-white/90">
                                Sudah memiliki akun?
                                <br />
                                silahkan klik tombol di bawah ini
                            </p>
                            <button
                                onClick={() => setIsSignUp(false)}
                                className="rounded-full border-2 border-white px-12 py-3 transition hover:bg-white/10"
                            >
                                MASUK
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col justify-center bg-white px-16">
                        <SignUpForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
