import React from "react";
import { Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TextInput from "@/components/TextInput";
import { pickBy } from "lodash";

function Table({ data }) {
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
            route("divisi-data-atk.index"),
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
                        <th className="px-6 py-3">Jenis ATK</th>
                        <th className="px-6 py-3">Kategori</th>
                        <th className="px-6 py-3">Stok</th>
                        <th className="px-6 py-3">Satuan</th>
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
                                        {item.pemasukan.jenis_atk}
                                    </td>
                                    <td className="px-6 py-3">
                                        {item.kategori.nama_kategori}
                                    </td>
                                    <td className="px-6 py-3">{item.stok}</td>
                                    <td className="px-6 py-3">
                                        {item.pemasukan.satuan.nama_satuan}
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
            <div className="flex flex-col gap-y-5 w-full lg:items-center items-start justify-between mt-5">
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
                                className="px-3 py-1 text-white bg-orange-400 rounded-md hover:bg-opacity-80 text-md pagination-button"
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
