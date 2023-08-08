import React from "react";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import GuestLayout from "@/layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Logo from "@/assets/Logo.png";
import ButtonPrimary from "@/components/ButtonPrimary";

function ForgotPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("forget-password.store"), {
            onSuccess: () => {
                reset("email");
            },
        });
    };

    return (
        <>
            <Head title="Login" />
            <GuestLayout>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <Link
                                    href={route("login")}
                                    className="flex items-center justify-center"
                                >
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="w-20 h-20"
                                    />
                                </Link>

                                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                                    Sipengat
                                </h1>

                                <p className="text-sm text-justify text-gray-700">
                                    lupa kata sandi Anda? Tidak masalah. Beri
                                    tahu kami alamat email Anda dan kami akan
                                    mengirimkan kata sandi melalui email atur
                                    ulang tautan yang memungkinkan anda memilih
                                    kata sandi yang baru.
                                </p>

                                <form
                                    onSubmit={onSubmit}
                                    className="space-y-4 md:space-y-6"
                                >
                                    {/* email */}
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            isFocused={true}
                                            placeholder="contoh@email.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        <InputError message={errors.email} />
                                    </div>

                                    {/* button */}
                                    <ButtonPrimary
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Reset
                                    </ButtonPrimary>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    );
}

export default ForgotPassword;
