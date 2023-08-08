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

function Satuan() {
    const { satuan } = usePage().props;

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        id: "",
        nama_satuan: "",
    });

    const [openModal, setOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    const closeModal = () => {
        setOpenModal(false);
        setIsEdit(false);
        reset();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("satuan.update", data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("satuan.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            nama_satuan: item.nama_satuan,
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah anda ingin menghapus data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#f97316",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("satuan.destroy", id));
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Satuan" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Satuan</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <div className="my-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            type="button"
                            className="bg-orange-400 p-2.5 text-white rounded-md flex items-center justify-center hover:bg-opacity-80 transition-all duration-200"
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                            <span className="ms-2">Tambah Satuan</span>
                        </button>
                    </div>

                    <Table
                        data={satuan}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <div className="w-full p-4 rounded-lg">
                    <h1 className="text-lg font-semibold">
                        {isEdit ? "Edit" : "Tambah"} Satuan
                    </h1>
                    <hr className="my-3" />
                    <form onSubmit={onSubmit}>
                        <div className="mb-5">
                            <InputLabel
                                htmlFor="nama_satuan"
                                value="Nama Satuan"
                            />

                            <TextInput
                                id="nama_satuan"
                                type="text"
                                name="nama_satuan"
                                isFocused={true}
                                value={data.nama_satuan}
                                onChange={(e) =>
                                    setData("nama_satuan", e.target.value)
                                }
                            />
                            {errors.nama_satuan && (
                                <InputError message={errors.nama_satuan} />
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
                                {isEdit ? "Edit" : "Tambah"}
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
            </Modal>
        </AppLayout>
    );
}

export default Satuan;
