import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/layouts/GuestLayout";
import Logo from "@/assets/Logo.png";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import ButtonPrimary from "@/components/ButtonPrimary";
import InputError from "@/components/InputError";
import Select from "react-select";
import Swal from "sweetalert2";

function Register({ status, divisi }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        divisi_id: "",
    });

    React.useEffect(() => {
        if (status) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: status,
                showConfirmButton: true,
            });
        }
    }, [status]);

    React.useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("register.store"));
    };

    const options = divisi.map((item) => ({
        value: item.id,
        label: item.nama_divisi,
    }));

    return (
        <>
            <Head title="Register" />
            <GuestLayout>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="w-20 h-20"
                                    />
                                </div>
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                                    Sipengat
                                </h1>

                                <form
                                    onSubmit={onSubmit}
                                    className="space-y-4 md:space-y-6"
                                >
                                    {/* nama */}
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Nama"
                                        />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            isFocused={true}
                                            placeholder="Masukkan nama anda"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />

                                        <InputError message={errors.name} />
                                    </div>

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
                                            autoComplete="username"
                                            placeholder="contoh@email.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        <InputError message={errors.email} />
                                    </div>

                                    {/* password */}
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* divisi */}
                                    <div>
                                        <InputLabel
                                            htmlFor="divisi_id"
                                            value="Divisi"
                                        />
                                        <Select
                                            name="divisi_id"
                                            id="divisi_id"
                                            options={options}
                                            placeholder="Pilih divisi"
                                            onChange={(selectedOption) =>
                                                setData(
                                                    "divisi_id",
                                                    selectedOption.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.divisi_id}
                                        />
                                    </div>

                                    {/* button */}
                                    <ButtonPrimary
                                        className="flex items-center justify-center w-full gap-3"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-loader-2 animate-spin"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M12 3a9 9 0 1 0 9 9" />
                                            </svg>
                                        )}
                                        Daftar
                                    </ButtonPrimary>
                                </form>
                            </div>
                        </div>

                        <div className="mt-10 text-gray-900">
                            Sudah punya akun?{" "}
                            <Link
                                href={route("login")}
                                className="text-blue-500"
                            >
                                klik disini
                            </Link>
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    );
}

export default Register;
