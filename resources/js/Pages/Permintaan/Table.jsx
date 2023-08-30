import React from "react";
import { Link, router } from "@inertiajs/react";
import { XCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/TextInput";
import { pickBy } from "lodash";
import Swal from "sweetalert2";
import moment from "moment/moment";

function Table({ data, onAcceptClick, onRefuseClick }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const perpage = React.useRef(data.per_page);
    const [search, setSearch] = React.useState("");

    const handlePerPageChange = (e) => {
        perpage.current = e.target.value;
        getData();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getData();
    };

    const getData = () => {
        setIsLoading(true);
        router.get(
            route("permintaan.index"),
            pickBy({ perpage: perpage.current, search }),
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return (
        <>
            <div className="flex items-center justify-between py-2">
                <div>
                    <select
                        name="perpage"
                        id="perpage"
                        value={perpage.current}
                        onChange={handlePerPageChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 focus:ring-2 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 "
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <form
                    className="flex items-center gap-x-2"
                    onSubmit={handleSearch}
                >
                    <TextInput
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className="p-2.5 text-white bg-orange-400 rounded-md hover:bg-opacity-80"
                    >
                        <MagnifyingGlassIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
            <table className="w-full mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-white bg-gray-500 ">
                        <th className="w-10 px-6 py-3 text-center">#</th>
                        <th className="px-6 py-3">Nama</th>
                        <th className="px-6 py-3">Divisi</th>
                        <th className="px-6 py-3">Jenis ATK</th>
                        <th className="px-6 py-3">Jumlah</th>
                        <th className="px-6 py-3">Tanggal</th>
                        <th className="w-32 px-6 py-3 text-center">@</th>
                    </tr>
                </thead>
                {data.data.length !== 0 ? (
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-3 text-center"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            data.data.map((item, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-3 text-center">
                                        {data.from + index}
                                    </td>
                                    <td className="px-6 py-3">
                                        {item.user.name}
                                    </td>
                                    <td className="px-6 py-3">
                                        {item.user.divisi.nama_divisi}
                                    </td>
                                    <td className="px-6 py-3">
                                        {item.data_atk?.pemasukan?.jenis_atk ??
                                            "-"}
                                    </td>
                                    <td className="px-6 py-3">
                                        {item.jumlah}{" "}
                                        {
                                            item.data_atk?.pemasukan?.satuan
                                                .nama_satuan
                                        }
                                    </td>
                                    <td className="px-6 py-3">
                                        {moment(item.created_at).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </td>

                                    <td className="flex items-center justify-center gap-1 px-6 py-3 text-white">
                                        {item.status === "menunggu" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        onAcceptClick(item)
                                                    }
                                                    type="button"
                                                    className="flex items-center justify-center p-1 transition-all duration-200 bg-blue-500 rounded-sm shadow hover:bg-opacity-80"
                                                >
                                                    Konfirmasi
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        onRefuseClick(item);
                                                    }}
                                                    type="button"
                                                    className="flex items-center justify-center p-1 transition-all duration-200 bg-red-500 rounded-sm shadow hover:bg-opacity-80"
                                                >
                                                    <XCircleIcon className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                        {item.status === "disetujui" && (
                                            <span className="px-2 py-1 text-xs text-center rounded-md bg-sky-500 text-nowrap">
                                                Disetujui
                                            </span>
                                        )}
                                        {item.status === "ditolak" && (
                                            <span className="px-2 py-1 text-xs text-center rounded-md bg-rose-500 text-nowrap">
                                                Ditolak
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td
                                colSpan={7}
                                className="px-6 py-3 text-center border-b"
                            >
                                Tidak ada data untuk ditampilkan.
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
            <div className="flex items-center justify-between mt-5">
                <p>
                    Showing
                    <span className="font-bold"> {data.from}</span> to
                    <span className="font-bold"> {data.to} </span>
                    total
                    <span className="font-bold"> {data.total}</span>
                </p>

                <div className="flex items-center justify-center gap-2">
                    {data.links.map((item, index) => {
                        return (
                            <Link
                                href={item.url}
                                key={index}
                                className="px-3 py-1 text-white bg-orange-400 rounded-md hover:bg-opacity-80 text-md"
                                preserveScroll
                                preserveState
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.label,
                                    }}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Table;
