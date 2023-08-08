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
    const { data_atk } = usePage().props;

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

    const closeModal = () => {
        setOpenModal(false);
        reset();
    };

    return (
        <AppLayout>
            <Head title="Data ATK" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Data ATK</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <Table data={data_atk} />
                </div>
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <div className="w-full p-4 rounded-lg">
                    <h1 className="text-lg font-semibold">Data ATK</h1>
                    <hr className="my-3" />
                </div>
            </Modal>
        </AppLayout>
    );
}

export default DataAtk;
