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
import moment from "moment";

function Permintaan() {
    const { permintaan, data_atk, auth } = usePage().props;

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        id: "",
        data_atk_id: "",
        jumlah: "",
    });

    const [openModal, setOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [isDetail, setIsDetail] = React.useState(false);
    const [detailData, setDetailData] = React.useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("divisi-permintaan.update", data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("divisi-permintaan.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setIsEdit(false);
        setOpenModal(false);
        setDetailData(null);
        setIsDetail(false);
        reset();
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            data_atk_id: item.data_atk_id,
            jumlah: item.jumlah,
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
                destroy(route("divisi-permintaan.destroy", id));
            }
        });
    };

    const handleShowDetail = (item) => {
        setIsDetail(true);
        setOpenModal(true);
        setDetailData(item);
    };

    const dataAtkOptions = data_atk.map((item) => ({
        value: item.id,
        label: item.pemasukan.jenis_atk + " | stok: " + item.stok,
    }));

    return (
        <AppLayout>
            <Head title="Permintaan ATK" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Permintaan ATK</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <div className="my-4">
                        <button
                            onClick={() => setOpenModal(true)}
                            type="button"
                            className="bg-orange-400 p-2.5 text-white rounded-md flex items-center justify-center hover:bg-opacity-80 transition-all duration-200"
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                            <span className="ms-2">Tambah Permintaan ATK</span>
                        </button>
                    </div>

                    <Table
                        data={permintaan}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleShowDetail={handleShowDetail}
                    />
                </div>
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <div className="w-full p-4 rounded-lg">
                    {isDetail ? (
                        <>
                            <h1 className="text-lg font-semibold">
                                Detail Permintaan ATK
                            </h1>
                            <hr className="my-3" />
                            <div>
                                <table>
                                    <tbody className="">
                                        <tr className="px-6 py-3">
                                            <td className="px-6 py-3">
                                                Jenis ATK
                                            </td>
                                            <td className="px-6 py-3">
                                                :{" "}
                                                {
                                                    detailData.data_atk
                                                        .pemasukan.jenis_atk
                                                }
                                            </td>
                                        </tr>
                                        <tr className="px-6 py-3">
                                            <td className="px-6 py-3">
                                                Jumlah
                                            </td>
                                            <td className="px-6 py-3">
                                                : {detailData.jumlah}{" "}
                                                {
                                                    detailData.data_atk
                                                        .pemasukan.satuan
                                                        .nama_satuan
                                                }
                                            </td>
                                        </tr>
                                        <tr className="px-6 py-3">
                                            <td className="px-6 py-3">
                                                Tanggal
                                            </td>
                                            <td className="px-6 py-3">
                                                :{" "}
                                                {moment(
                                                    detailData.created_at
                                                ).format("DD-MM-YYYY")}
                                            </td>
                                        </tr>
                                        <tr className="px-6 py-3">
                                            <td className="px-6 py-3">
                                                Status
                                            </td>
                                            <td className="px-6 py-3">
                                                :{" "}
                                                {detailData.status ===
                                                    "menunggu" && (
                                                    <span className="px-3 py-1 text-white bg-yellow-300 rounded-md">
                                                        {detailData.status}
                                                    </span>
                                                )}
                                                {detailData.status ===
                                                    "disetujui" && (
                                                    <span className="px-3 py-1 text-white rounded-md bg-sky-500">
                                                        {detailData.status}
                                                    </span>
                                                )}
                                                {detailData.status ===
                                                    "ditolak" && (
                                                    <span className="px-3 py-1 text-white rounded-md bg-rose-500">
                                                        {detailData.status}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="px-6 py-3">
                                            <td className="px-6 py-3">Pesan</td>
                                            <td className="px-6 py-3">
                                                : {detailData.pesan}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-lg font-semibold">
                                {isEdit ? "Edit" : "Tambah"} Permintaan ATK
                            </h1>
                            <hr className="my-3" />
                            <form onSubmit={onSubmit}>
                                <div className="mb-5">
                                    <InputLabel
                                        htmlFor="data_atk_id"
                                        value="Daftar ATK"
                                    />
                                    <Select
                                        name="data_atk_id"
                                        id="data_atk_id"
                                        options={dataAtkOptions}
                                        defaultValue={dataAtkOptions.find(
                                            (option) =>
                                                option.value ===
                                                data.data_atk_id
                                        )}
                                        onChange={(selectedOption) =>
                                            setData(
                                                "data_atk_id",
                                                selectedOption.value
                                            )
                                        }
                                    />

                                    {errors.data_atk_id && (
                                        <InputError
                                            message={errors.data_atk_id}
                                        />
                                    )}
                                </div>

                                <div className="mb-5">
                                    <InputLabel
                                        htmlFor="deskripsi"
                                        value="Deskripsi"
                                    />

                                    <TextInput
                                        id="deskripsi"
                                        type="text"
                                        name="deskripsi"
                                        isFocused={true}
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData("deskripsi", e.target.value)
                                        }
                                    />
                                    {errors.deskripsi && (
                                        <InputError
                                            message={errors.deskripsi}
                                        />
                                    )}
                                </div>

                                <div className="mb-5">
                                    <InputLabel
                                        htmlFor="jumlah"
                                        value="Jumlah"
                                    />

                                    <TextInput
                                        id="jumlah"
                                        type="number"
                                        name="jumlah"
                                        isFocused={true}
                                        value={data.jumlah}
                                        onChange={(e) =>
                                            setData("jumlah", e.target.value)
                                        }
                                    />
                                    {errors.jumlah && (
                                        <InputError message={errors.jumlah} />
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
                        </>
                    )}
                </div>
            </Modal>
        </AppLayout>
    );
}

export default Permintaan;
