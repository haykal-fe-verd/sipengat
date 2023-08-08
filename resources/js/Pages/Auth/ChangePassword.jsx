import ButtonPrimary from "@/components/ButtonPrimary";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import AppLayout from "@/layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

function ChangePassword() {
    const passwordInput = React.useRef();
    const currentPasswordInput = React.useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: (response) => {
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: response?.props?.status,
                    showConfirmButton: true,
                });
            },
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Password" />
            <div className="w-full p-4 bg-white">
                <form onSubmit={updatePassword}>
                    <h5 className="text-xl font-bold">Ganti password</h5>
                    <hr className="mt-4" />
                    <p className="mt-4">
                        Pastikan akun anda menggunakan kata sandi acak yang
                        panjang agar tetap aman, dan juga passwordnya diingat.
                    </p>
                    <div className="mt-10">
                        {/* password lama */}
                        <div>
                            <InputLabel
                                htmlFor="current_password"
                                value="Password Lama"
                            />
                            <TextInput
                                ref={currentPasswordInput}
                                id="current_password"
                                name="current_password"
                                type="password"
                                autoComplete="current_password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                            />
                            <InputError message={errors.current_password} />
                        </div>

                        {/* password baru */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="password"
                                value="Password Baru"
                            />
                            <TextInput
                                ref={passwordInput}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* password konfirmasi */}
                        <div className="mt-5">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Konfirmasi Password"
                            />
                            <TextInput
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                autoComplete="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>

                        <ButtonPrimary className="mt-5" disabled={processing}>
                            Simpan
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

export default ChangePassword;
