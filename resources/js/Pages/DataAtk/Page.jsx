import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Table from "./Table";
import Modal from "@/components/Modal";
import InputError from "@/components/InputError";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import ButtonPrimary from "@/components/ButtonPrimary";
import Swal from "sweetalert2";

function DataAtk() {
    const { data_atk, kategori, pemasukan } = usePage().props;

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
        stok: "",
        kategori_id: "",
        pemasukan_id: "",
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
            put(route("data-atk.update", data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("data-atk.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            stok: item.stok,
            kategori_id: item.kategori.id,
            pemasukan_id: item.pemasukan.id,
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
                destroy(route("data-atk.destroy", id));
            }
        });
    };

    const loadPemasukanOptions = (inputValue, callback) => {
        setTimeout(() => {
            const filteredOptions = pemasukanOptions.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(filteredOptions);
        }, 1000);
    };

    const pemasukanOptions = pemasukan.map((item) => ({
        value: item.id,
        label:
            item.supplier.nama_supplier +
            " | " +
            item.jenis_atk +
            " | " +
            item.jumlah_masuk,
        jumlah_masuk: item.jumlah_masuk,
    }));

    const kategoriOptions = kategori.map((item) => ({
        value: item.id,
        label: item.nama_kategori,
    }));

    return (
        <AppLayout>
            <Head title="Data ATK" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Data ATK</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <div className="my-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            type="button"
                            className="bg-orange-400 p-2.5 text-white rounded-md flex items-center justify-center hover:bg-opacity-80 transition-all duration-200"
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                            <span className="ms-2">Tambah Data ATK</span>
                        </button>
                    </div>

                    <Table
                        data={data_atk}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <div className="w-full p-4 rounded-lg">
                    <h1 className="text-lg font-semibold">
                        {isEdit ? "Edit" : "Tambah"} Data ATK
                    </h1>
                    <hr className="my-3" />
                    <form onSubmit={onSubmit}>
                        <div className="mb-5">
                            <InputLabel
                                htmlFor="pemasukan_id"
                                value="Sumber Pemasukan"
                            />
                            <AsyncSelect
                                name="pemasukan_id"
                                id="pemasukan_id"
                                cacheOptions
                                defaultOptions
                                isClearable
                                loadOptions={loadPemasukanOptions}
                                defaultValue={pemasukanOptions.find(
                                    (option) =>
                                        option.value === data.pemasukan_id
                                )}
                                onChange={(selectedOption) =>
                                    setData({
                                        pemasukan_id: selectedOption.value,
                                        stok: selectedOption.jumlah_masuk,
                                    })
                                }
                            />

                            {errors.pemasukan_id && (
                                <InputError message={errors.pemasukan_id} />
                            )}
                        </div>

                        <div className="mb-5">
                            <InputLabel
                                htmlFor="kategori_id"
                                value="Kategori"
                            />
                            <Select
                                name="kategori_id"
                                id="kategori_id"
                                options={kategoriOptions}
                                defaultValue={kategoriOptions.find(
                                    (option) =>
                                        option.value === data.kategori_id
                                )}
                                onChange={(selectedOption) =>
                                    setData("kategori_id", selectedOption.value)
                                }
                            />

                            {errors.kategori_id && (
                                <InputError message={errors.kategori_id} />
                            )}
                        </div>

                        <div className="mb-5">
                            <InputLabel htmlFor="stok" value="Stok" />

                            <TextInput
                                id="stok"
                                type="number"
                                name="stok"
                                value={data.stok}
                                onChange={(e) =>
                                    setData("stok", e.target.value)
                                }
                            />
                            {errors.stok && (
                                <InputError message={errors.stok} />
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

export default DataAtk;
