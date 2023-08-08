import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import Table from "./Table";

function Permintaan() {
    const { pengeluaran } = usePage().props;

    return (
        <AppLayout>
            <Head title="Pengeluaran" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Pengeluaran</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <Table data={pengeluaran} />
                </div>
            </div>
        </AppLayout>
    );
}

export default Permintaan;
