import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Table from "./Table";
import Modal from "@/components/Modal";
import InputError from "@/components/InputError";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import ButtonPrimary from "@/components/ButtonPrimary";
import Swal from "sweetalert2";
import TextAreaInput from "@/components/TextAreaInput";

function Permintaan() {
    const { permintaan } = usePage().props;

    const { data, setData, put, processing, errors, reset } = useForm({
        id: "",
        user_id: "",
        data_atk_id: "",
        pesan: "",
    });

    const [openModal, setOpenModal] = React.useState(false);
    const [isRefuse, setIsRefuse] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (isRefuse) {
            put(route("permintaan.refuse", data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            put(route("permintaan.accept", data.id), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setIsRefuse(false);
        reset();
    };

    const onAcceptClick = (item) => {
        setIsRefuse(false);
        setOpenModal(true);
        setData({
            id: item.id,
            user_id: item.user_id,
            data_atk_id: item.data_atk_id,
            psean: item.pesan,
        });
    };

    const onRefuseClick = (item) => {
        setIsRefuse(true);
        setOpenModal(true);
        setData({
            id: item.id,
            user_id: item.user_id,
            data_atk_id: item.data_atk_id,
            psean: item.pesan,
        });
    };

    return (
        <AppLayout>
            <Head title="Permintaan" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Permintaan</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <Table
                        data={permintaan}
                        onAcceptClick={onAcceptClick}
                        onRefuseClick={onRefuseClick}
                    />
                </div>
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <div className="w-full p-4 rounded-lg">
                    <h1 className="text-lg font-semibold">
                        {isRefuse
                            ? "Tolak Permintaan"
                            : "Konfirmasi Permintaan"}
                    </h1>
                    <hr className="my-3" />
                    <form onSubmit={onSubmit}>
                        <p className="mb-5">
                            Beritahu kepada divisi mengapa anda{" "}
                            <span className="font-bold">
                                {isRefuse ? "Menolak" : "Konfirmasi"}
                            </span>{" "}
                            permintaan mereka.
                        </p>
                        <div className="mb-5">
                            <InputLabel htmlFor="pesan" value="Pesan" />

                            <TextAreaInput
                                rows="5"
                                id="pesan"
                                name="pesan"
                                value={data.pesan}
                                onChange={(e) =>
                                    setData("pesan", e.target.value)
                                }
                            />

                            {errors.pesan && (
                                <InputError message={errors.pesan} />
                            )}
                        </div>

                        <div className="flex justify-end mt-5">
                            <ButtonPrimary
                                disabled={processing}
                                className="flex items-center gap-3"
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
                                {isRefuse ? "Tolak" : "Konfirmasi"}
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
            </Modal>
        </AppLayout>
    );
}

export default Permintaan;
