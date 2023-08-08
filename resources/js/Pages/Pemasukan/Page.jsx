import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import Table from "./Table";
import Modal from "@/components/Modal";
import InputError from "@/components/InputError";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import ButtonPrimary from "@/components/ButtonPrimary";
import Swal from "sweetalert2";

function Pemasukan() {
    const { pemasukan, supplier, satuan } = usePage().props;

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
        supplier_id: "",
        satuan_id: "",
        jenis_atk: "",
        nomor_faktur: "",
        tanggal_masuk: "",
        jumlah_masuk: "",
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
            put(route("pemasukan.update", data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("pemasukan.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            supplier_id: item.supplier.id,
            satuan_id: item.satuan.id,
            jenis_atk: item.jenis_atk,
            nomor_faktur: item.nomor_faktur,
            tanggal_masuk: item.tanggal_masuk,
            jumlah_masuk: item.jumlah_masuk,
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
                destroy(route("pemasukan.destroy", id));
            }
        });
    };

    const supplierOptions = supplier.map((item) => ({
        value: item.id,
        label: item.nama_supplier,
    }));

    const satuanOptions = satuan.map((item) => ({
        value: item.id,
        label: item.nama_satuan,
    }));

    return (
        <AppLayout>
            <Head title="Pemasukan" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Pemasukan</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <div className="my-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            type="button"
                            className="bg-orange-400 p-2.5 text-white rounded-md flex items-center justify-center hover:bg-opacity-80 transition-all duration-200"
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                            <span className="ms-2">Tambah Pemasukan</span>
                        </button>
                    </div>

                    <Table
                        data={pemasukan}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <div className="w-full p-4 rounded-lg">
                    <h1 className="text-lg font-semibold">
                        {isEdit ? "Edit" : "Tambah"} Pemasukan
                    </h1>
                    <hr className="my-3" />
                    <form onSubmit={onSubmit}>
                        <div className="mb-5">
                            <InputLabel
                                htmlFor="nomor_faktur"
                                value="Nomor Faktur"
                            />

                            <TextInput
                                id="nomor_faktur"
                                type="text"
                                name="nomor_faktur"
                                isFocused={true}
                                value={data.nomor_faktur}
                                onChange={(e) =>
                                    setData("nomor_faktur", e.target.value)
                                }
                            />
                            {errors.nomor_faktur && (
                                <InputError message={errors.nomor_faktur} />
                            )}
                        </div>
                        <div className="mb-5">
                            <InputLabel htmlFor="jenis_atk" value="Jenis ATK" />

                            <TextInput
                                id="jenis_atk"
                                type="text"
                                name="jenis_atk"
                                value={data.jenis_atk}
                                onChange={(e) =>
                                    setData("jenis_atk", e.target.value)
                                }
                            />
                            {errors.jenis_atk && (
                                <InputError message={errors.jenis_atk} />
                            )}
                        </div>
                        <div className="mb-5">
                            <InputLabel
                                htmlFor="supplier_id"
                                value="Supplier"
                            />
                            <Select
                                name="supplier_id"
                                id="supplier_id"
                                options={supplierOptions}
                                defaultValue={supplierOptions.find(
                                    (option) =>
                                        option.value === data.supplier_id
                                )}
                                onChange={(selectedOption) =>
                                    setData("supplier_id", selectedOption.value)
                                }
                            />

                            {errors.supplier_id && (
                                <InputError message={errors.supplier_id} />
                            )}
                        </div>
                        <div className="mb-5">
                            <InputLabel
                                htmlFor="tanggal_masuk"
                                value="Tanggal Masuk"
                            />

                            <TextInput
                                id="tanggal_masuk"
                                type="date"
                                name="tanggal_masuk"
                                value={data.tanggal_masuk}
                                onChange={(e) =>
                                    setData("tanggal_masuk", e.target.value)
                                }
                            />
                            {errors.tanggal_masuk && (
                                <InputError message={errors.tanggal_masuk} />
                            )}
                        </div>
                        <div className="mb-5">
                            <InputLabel
                                htmlFor="jumlah_masuk"
                                value="Jumlah Masuk"
                            />

                            <TextInput
                                id="jumlah_masuk"
                                type="number"
                                name="jumlah_masuk"
                                value={data.jumlah_masuk}
                                onChange={(e) =>
                                    setData("jumlah_masuk", e.target.value)
                                }
                            />
                            {errors.jumlah_masuk && (
                                <InputError message={errors.jumlah_masuk} />
                            )}
                        </div>
                        <div className="mb-5">
                            <InputLabel htmlFor="satuan_id" value="Satuan" />
                            <Select
                                name="satuan_id"
                                id="satuan_id"
                                options={satuanOptions}
                                defaultValue={satuanOptions.find(
                                    (option) => option.value === data.satuan_id
                                )}
                                onChange={(selectedOption) =>
                                    setData("satuan_id", selectedOption.value)
                                }
                            />

                            {errors.satuan_id && (
                                <InputError message={errors.satuan_id} />
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

export default Pemasukan;
