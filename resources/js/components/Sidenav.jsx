import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
    ComputerDesktopIcon,
    BuildingStorefrontIcon,
    CurrencyRupeeIcon,
    TagIcon,
    RocketLaunchIcon,
    ArrowUpRightIcon,
    BriefcaseIcon,
    Square3Stack3DIcon,
    ArrowDownRightIcon,
    PrinterIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/assets/Logo.png";

function Sidenav() {
    const { auth } = usePage().props;
    const currentPath = window.location.pathname;

    const menuItemStyles = {
        root: {
            fontSize: "15px",
            fontWeight: 500,
        },
        icon: ({ active }) => {
            return {
                color: active ? "#fff" : "#000",
                fontSize: "18px",
            };
        },
        SubMenuExpandIcon: {
            fontSize: "13px",
            color: "#b6b7b9",
        },
        subMenuContent: ({ level }) => ({
            backgroundColor: level === 0 ? "#f3f4f6" : "transparent",
        }),
        button: ({ active }) => {
            return {
                "&:hover": {
                    backgroundColor: active ? "#fb923c" : "#d1d5db",
                },
                backgroundColor: active ? "#f97316" : "undefined",
                opacity: 0.8,
                color: active ? "#fff" : "#000",
            };
        },

        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };

    return (
        <Sidebar
            breakPoint="md"
            backgroundColor="#ffffff"
            rootStyles={{
                color: "#111827",
                minHeight: "100vh",
            }}
        >
            <div className="flex flex-col">
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center m-7"
                    preserveScroll
                    preserveState
                >
                    {/* foto profil */}
                    {auth?.user?.image ? (
                        <img
                            src={auth?.user?.image}
                            alt="User Profile"
                            className="object-cover w-20 h-20 border-2 border-orange-500 rounded-full"
                        />
                    ) : (
                        <img
                            src={Logo}
                            alt="User Profile"
                            className="object-cover w-20 h-20 rounded-full"
                        />
                    )}

                    {/* nama */}
                    <h5 className="mt-2 text-base font-bold text-center uppercase">
                        {auth?.user?.name}
                    </h5>

                    {/* divisi */}
                    <h6 className="text-xs text-center text-orange-500">
                        {auth?.user?.divisi?.nama_divisi}
                    </h6>
                </Link>

                <Menu menuItemStyles={menuItemStyles}>
                    {/* logistik */}
                    <MenuItem
                        label="Dashboard"
                        component={
                            <Link
                                href="/"
                                aria-label="dashboard"
                                preserveScroll
                                preserveState
                            />
                        }
                        icon={<ComputerDesktopIcon className="w-6 h-6" />}
                        active={currentPath === "/"}
                    >
                        Dashboard
                    </MenuItem>

                    {auth.user.role === "logistik" && (
                        <>
                            <MenuItem
                                label="Data ATK"
                                component={
                                    <Link
                                        href="/data-atk"
                                        aria-label="data-atk"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={<BriefcaseIcon className="w-6 h-6" />}
                                active={currentPath === "/data-atk"}
                            >
                                Data ATK
                            </MenuItem>

                            <MenuItem
                                label="Permintaan"
                                component={
                                    <Link
                                        href="/permintaan"
                                        aria-label="permintaan"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={
                                    <Square3Stack3DIcon className="w-6 h-6" />
                                }
                                active={currentPath === "/permintaan"}
                            >
                                Permintaan
                            </MenuItem>

                            <MenuItem
                                label="Pemasukan"
                                component={
                                    <Link
                                        href="/pemasukan"
                                        aria-label="pemasukan"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={<ArrowUpRightIcon className="w-6 h-6" />}
                                active={currentPath === "/pemasukan"}
                            >
                                Pemasukan
                            </MenuItem>

                            <MenuItem
                                label="Pengeluaran"
                                component={
                                    <Link
                                        href="/pengeluaran"
                                        aria-label="pengeluaran"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={
                                    <ArrowDownRightIcon className="w-6 h-6" />
                                }
                                active={currentPath === "/pengeluaran"}
                            >
                                Pengeluaran
                            </MenuItem>

                            <MenuItem
                                label="Supplier"
                                component={
                                    <Link
                                        href="/supplier"
                                        aria-label="supplier"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={<RocketLaunchIcon className="w-6 h-6" />}
                                active={currentPath === "/supplier"}
                            >
                                Supplier
                            </MenuItem>

                            <MenuItem
                                label="Divisi"
                                component={
                                    <Link
                                        href="/divisi"
                                        aria-label="divisi"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={
                                    <BuildingStorefrontIcon className="w-6 h-6" />
                                }
                                active={currentPath === "/divisi"}
                            >
                                Divisi
                            </MenuItem>

                            <MenuItem
                                label="Satuan"
                                component={
                                    <Link
                                        href="/satuan"
                                        aria-label="satuan"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={<CurrencyRupeeIcon className="w-6 h-6" />}
                                active={currentPath === "/satuan"}
                            >
                                Satuan
                            </MenuItem>

                            <MenuItem
                                label="Kategori"
                                component={
                                    <Link
                                        href="/kategori"
                                        aria-label="kategori"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={<TagIcon className="w-6 h-6" />}
                                active={currentPath === "/kategori"}
                            >
                                Kategori
                            </MenuItem>

                            <MenuItem
                                label="Laporan"
                                component={
                                    <Link
                                        href="/laporan"
                                        aria-label="laporan"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={<PrinterIcon className="w-6 h-6" />}
                                active={currentPath === "/laporan"}
                            >
                                Laporan
                            </MenuItem>
                        </>
                    )}

                    {/* divisi */}
                    {auth.user.role === "divisi" && (
                        <>
                            <MenuItem
                                label="Data ATK"
                                component={
                                    <Link
                                        href="/divisi/data-atk"
                                        aria-label="data-atk"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={<BriefcaseIcon className="w-6 h-6" />}
                                active={currentPath === "/divisi/data-atk"}
                            >
                                Data ATK
                            </MenuItem>

                            <MenuItem
                                label="Permintaan ATK"
                                component={
                                    <Link
                                        href="/divisi/permintaan"
                                        aria-label="permintaan atk"
                                        preserveScroll
                                        preserveState
                                    />
                                }
                                icon={
                                    <Square3Stack3DIcon className="w-6 h-6" />
                                }
                                active={currentPath === "/divisi/permintaan"}
                            >
                                Permintaan ATK
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </div>
        </Sidebar>
    );
}

export default Sidenav;
