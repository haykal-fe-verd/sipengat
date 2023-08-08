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

function Supplier() {
    const { supplier } = usePage().props;

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
        nama_supplier: "",
        telepon: "",
        alamat: "",
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
            put(route("supplier.update", data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("supplier.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            nama_supplier: item.nama_supplier,
            telepon: item.telepon,
            alamat: item.alamat,
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
                destroy(route("supplier.destroy", id));
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Supplier" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Supplier</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <div className="my-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            type="button"
                            className="bg-orange-400 p-2.5 text-white rounded-md flex items-center justify-center hover:bg-opacity-80 transition-all duration-200"
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                            <span className="ms-2">Tambah Supplier</span>
                        </button>
                    </div>

                    <Table
                        data={supplier}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <div className="w-full p-4 rounded-lg">
                    <h1 className="text-lg font-semibold">
                        {isEdit ? "Edit" : "Tambah"} Supplier
                    </h1>
                    <hr className="my-3" />
                    <form onSubmit={onSubmit}>
                        <div className="mb-5">
                            <InputLabel
                                htmlFor="nama_supplier"
                                value="Nama Supplier"
                            />

                            <TextInput
                                id="nama_supplier"
                                type="text"
                                name="nama_supplier"
                                isFocused={true}
                                value={data.nama_supplier}
                                onChange={(e) =>
                                    setData("nama_supplier", e.target.value)
                                }
                            />
                            {errors.nama_supplier && (
                                <InputError message={errors.nama_supplier} />
                            )}
                        </div>

                        <div className="mb-5">
                            <InputLabel htmlFor="telepon" value="Telepon" />

                            <TextInput
                                id="telepon"
                                type="text"
                                name="telepon"
                                value={data.telepon}
                                onChange={(e) =>
                                    setData("telepon", e.target.value)
                                }
                            />
                            {errors.telepon && (
                                <InputError message={errors.telepon} />
                            )}
                        </div>

                        <div className="mb-5">
                            <InputLabel htmlFor="alamat" value="Alamat" />

                            <TextAreaInput
                                rows="5"
                                id="alamat"
                                name="alamat"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                            />
                            {errors.alamat && (
                                <InputError message={errors.alamat} />
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

export default Supplier;
