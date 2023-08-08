import React from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import Select from "react-select";
import { PrinterIcon, FunnelIcon } from "@heroicons/react/24/outline";
import ReactToPrint from "react-to-print";
import Table from "./Table";
import { pickBy } from "lodash";
import TextInput from "@/components/TextInput";
import ButtonPrimary from "@/components/ButtonPrimary";
import PrintComponent from "@/components/PrintComponent";

function Laporan() {
    const { laporan_pemasukan, laporan_pengeluaran } = usePage().props;

    const { data, setData, get, put, processing, errors, reset } = useForm({
        jenis: "pemasukan",
        dari_tanggal: "",
        sampai_tanggal: "",
    });

    const options = [
        { value: "pemasukan", label: "Pemasukan" },
        { value: "pengeluaran", label: "Pengeluaran" },
    ];

    const getData = () => {
        router.get(
            route("laporan.index"),
            pickBy({
                dari_tanggal: data.dari_tanggal,
                sampai_tanggal: data.sampai_tanggal,
            }),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getData();
    };

    const componentRef = React.useRef();

    return (
        <AppLayout>
            <Head title="Laporan" />

            <div className="w-full p-4 bg-white">
                <h5 className="text-xl font-bold">Laporan</h5>
                <hr className="mt-4" />

                <div className="relative overflow-x-auto">
                    <div className="p-2 my-4">
                        <Select
                            defaultValue={options[0]}
                            options={options}
                            placeholder="Pilih jenis laporan"
                            onChange={(selectedOption) =>
                                setData("jenis", selectedOption.value)
                            }
                        />
                    </div>

                    <form
                        onSubmit={onSubmit}
                        className="grid grid-cols-1 gap-4 p-2 my-4 lg:grid-cols-3"
                    >
                        <div className="flex items-center">
                            <label
                                htmlFor="dari_tanggal"
                                className="whitespace-nowrap me-2"
                            >
                                Dari Tanggal
                            </label>
                            <TextInput
                                type="date"
                                name="dari_tanggal"
                                id="dari_tanggal"
                                onChange={(e) =>
                                    setData("dari_tanggal", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex items-center">
                            <label
                                htmlFor="sampai_tanggal"
                                className="whitespace-nowrap me-2"
                            >
                                Sampai Tanggal
                            </label>
                            <TextInput
                                type="date"
                                name="sampai_tanggal"
                                id="sampai_tanggal"
                                onChange={(e) =>
                                    setData("sampai_tanggal", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex gap-3">
                            <ButtonPrimary className="flex items-center">
                                <FunnelIcon className="w-5 h-5 text-white me-2" />
                                <span>Filter</span>
                            </ButtonPrimary>

                            <ReactToPrint
                                trigger={() => (
                                    <ButtonPrimary className="flex items-center">
                                        <>
                                            <PrinterIcon className="w-5 h-5 text-white me-2" />
                                            <span>Cetak</span>
                                        </>
                                    </ButtonPrimary>
                                )}
                                content={() => componentRef.current}
                            />
                        </div>
                    </form>

                    <Table
                        data={
                            data.jenis === "pemasukan"
                                ? laporan_pemasukan
                                : laporan_pengeluaran
                        }
                        jenis={data.jenis}
                        dari_tanggal={data.dari_tanggal}
                        sampai_tanggal={data.sampai_tanggal}
                    />
                </div>
            </div>

            <PrintComponent
                ref={componentRef}
                title={
                    data.jenis === "pemasukan"
                        ? "Laporan Pemasukan"
                        : "Laporan Pengeluaran"
                }
                jenis={data.jenis}
                laporan_pemasukan={laporan_pemasukan}
                laporan_pengeluaran={laporan_pengeluaran}
                dari_tanggal={data.dari_tanggal}
                sampai_tanggal={data.sampai_tanggal}
            />
        </AppLayout>
    );
}

export default Laporan;
