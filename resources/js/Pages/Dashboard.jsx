import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import Chart from "react-apexcharts";

function LineChartDivisi(props) {
    const { data, bulan } = props;

    const options = {
        chart: {
            id: "total-permintaan-chart",
            type: "line",
            shadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#f97316"],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3"],
                opacity: 0.0,
            },
        },
        markers: {
            size: 6,
        },
        xaxis: {
            categories: Object.values(bulan),
        },
        yaxis: {
            title: {
                text: "Total Permintaan",
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };

    const series = [
        {
            name: "Total Permintaan",
            data: data,
        },
    ];

    return <Chart options={options} series={series} type="line" height={500} />;
}

function LineChartLogistik(props) {
    const { dataPemasukan, dataPengeluaran, bulan } = props;

    const options = {
        chart: {
            height: 500,
            type: "line",
            shadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#f97316", "#786BED"],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.0,
            },
        },
        markers: {
            size: 6,
        },
        xaxis: {
            categories: Object.values(bulan),
            labels: {
                style: {
                    colors: "#9aa0ac",
                },
            },
        },
        yaxis: {
            title: {
                text: "Total Pemasukan/Pengeluaran",
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };

    const series = [
        {
            name: "Pemasukan",
            data: dataPemasukan,
        },
        {
            name: "Pengeluaran",
            data: dataPengeluaran,
        },
    ];

    return <Chart options={options} series={series} type="line" height={500} />;
}

function Dashboard(props) {
    const { auth } = props;
    return (
        <>
            <Head title="Dashboard" />
            <AppLayout>
                <div className="w-full p-4 bg-white">
                    <div className="text-center text-orange-400 font-bold">
                        <h2>Selamat Datang {auth.user.name}!</h2>
                    </div>
                </div>
                {auth.user.role === "divisi" && (
                    <>
                        <div className="w-full mt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Permintaan
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalPermintaanDivisi}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Permintaan Diterima
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalPermintaanDiterimaDivisi}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Permintaan Ditolak
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalPermintaanDitolakDivisi}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-4 bg-white mt-4 overflow-auto">
                            <h2 className="font-bold">
                                Grafik Total Permintaan Tahunan
                            </h2>
                            <div className="mt-5">
                                <LineChartDivisi
                                    data={props.chartDivisi}
                                    bulan={props.bulan}
                                />
                            </div>
                        </div>
                    </>
                )}

                {auth.user.role === "logistik" && (
                    <>
                        <div className="w-full mt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Divisi
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalDivisi}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Satuan
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalSatuan}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Kategori
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalKategori}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Supplier
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalSupplier}
                                    </p>
                                </div>
                            </div>
                            {/*  */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Pemasukan
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalPemasukan}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Keluar
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalPengeluaran}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total ATK
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalDataAtk}
                                    </p>
                                </div>
                                <div className="w-full p-4 bg-white flex flex-col gap-3 justify-start">
                                    <h4 className="font-bold text-2xl">
                                        Total Supplier
                                    </h4>
                                    <p className="font-bold text-lg text-orange-500">
                                        {props.totalSupplier}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-4 bg-white mt-4 overflow-auto">
                            <h2 className="font-bold">
                                Grafik Pemasukan dan Pengeluaran Tahun{" "}
                                {new Date().getFullYear()}
                            </h2>
                            <div className="mt-5">
                                <LineChartLogistik
                                    dataPengeluaran={props.chartPengeluaran}
                                    dataPemasukan={props.chartPemasukan}
                                    bulan={props.bulan}
                                />
                            </div>
                        </div>
                    </>
                )}
            </AppLayout>
        </>
    );
}

export default Dashboard;
