import React, { useRef } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import AppLayout from "@/layouts/AppLayout";
import ButtonPrimary from "@/components/ButtonPrimary";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import Swal from "sweetalert2";

function Profile() {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: auth?.user?.name,
        email: auth?.user?.email,
        image: auth?.user?.image,
    });

    const inputRef = React.useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            onSuccess: (response) => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: response?.props?.status,
                    showConfirmButton: true,
                });
            },
        });
    };

    const onChange = (e) => {
        const file = e.target.files[0];
        setData("image", e.target.files[0]);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgPreview = document.getElementById("image");
                if (imgPreview) {
                    imgPreview.src = reader.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const browse = () => {
        inputRef.current.click();
    };

    return (
        <AppLayout>
            <Head title="Profil" />

            <div className="w-full p-4 bg-white ">
                <form onSubmit={onSubmit}>
                    <div className="relative inline-block w-full bg-gradient-to-br from-orange-500 via-rose-400 to-yellow-300 h-60">
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={inputRef}
                            onChange={onChange}
                        />

                        <img
                            id="image"
                            src={auth?.user?.image}
                            alt="User Profile"
                            className="absolute object-cover w-20 h-20 border-2 rounded-full -bottom-10 left-10"
                        />
                        <button
                            type="button"
                            onClick={browse}
                            className="absolute flex items-center justify-center w-20 h-20 text-white transition-opacity duration-300 bg-black rounded-full opacity-50 -bottom-10 left-10 hover:opacity-80"
                        >
                            <CameraIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-10">
                        {/* nama */}
                        <div>
                            <InputLabel htmlFor="name" value="Nama" />
                            <TextInput
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                isFocused={true}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* email */}
                        <div className="mt-5">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
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

export default Profile;
