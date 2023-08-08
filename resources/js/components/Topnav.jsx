import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Menu, Transition } from "@headlessui/react";
import { useProSidebar } from "react-pro-sidebar";
import Swal from "sweetalert2";
import {
    UserIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    BellAlertIcon,
    Bars3Icon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/assets/Logo.png";

function Topnav() {
    const { post } = useForm();
    const { toggleSidebar } = useProSidebar();

    const handleLogout = () => {
        Swal.fire({
            title: "Apakah anda ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Logout",
            confirmButtonColor: "#f97316",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("logout"));
            }
        });
    };
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [currentDate, setCurrentDate] = React.useState(new Date());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    const currentDateFormatted = currentDate.toLocaleDateString(
        "id-ID",
        options
    );

    const currentTimeFormatted = currentTime.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <nav className="w-full bg-white">
            <div className="flex justify-between p-2">
                {/* left */}
                <Link
                    href={route("dashboard")}
                    className="flex items-center w-full"
                >
                    <img src={Logo} alt="Logo" width="40" height="40" />
                    <span className="text-xl font-bold uppercase ms-3">
                        SIPENGAT
                    </span>
                </Link>

                {/* right */}
                <div className="flex items-center justify-end w-full space-x-2">
                    {/* tanggal */}
                    <div className="justify-center hidden lg:block px-4 py-2 text-sm font-medium  bg-orange-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outl ine-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-opacity-75 text-orange-500">
                        {currentDateFormatted}
                    </div>

                    {/* jam */}
                    <div className="justify-center hidden lg:block px-4 py-2 text-sm font-medium  bg-orange-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outl ine-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-opacity-75 text-orange-500">
                        {currentTimeFormatted}
                    </div>

                    {/* mobile nav */}
                    <button
                        onClick={() => toggleSidebar()}
                        className="justify-center block px-4 py-2 text-sm font-medium text-gray-900 bg-orange-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outl ine-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-opacity-75 md:hidden"
                    >
                        <Bars3Icon className="w-5 h-5 text-orange-500" />
                    </button>

                    {/* user */}
                    <Menu
                        as="div"
                        className="relative inline-block text-center"
                    >
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-orange-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outl ine-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-opacity-75">
                            <AdjustmentsHorizontalIcon className="w-5 h-5 text-orange-500" />
                        </Menu.Button>

                        <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-30 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="flex flex-col px-1 py-3">
                                    <Menu.Item>
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-3 py-1 rounded-lg hover:bg-orange-500/80 group"
                                        >
                                            <UserIcon className="w-5 h-5 text-orange-500 group-hover:text-white" />
                                            <span className="ms-2 group-hover:text-white">
                                                Profile
                                            </span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link
                                            href="/password"
                                            className="flex items-center px-3 py-1 rounded-lg hover:bg-orange-500/80 group"
                                        >
                                            <Cog6ToothIcon className="w-5 h-5 text-orange-500 group-hover:text-white" />
                                            <span className="ms-2 group-hover:text-white">
                                                Ganti Password
                                            </span>
                                        </Link>
                                    </Menu.Item>

                                    <hr className="mt-3 mb-5" />

                                    <Menu.Item>
                                        <button
                                            onClick={handleLogout}
                                            className="inline-flex items-center justify-center px-3 py-1 text-white bg-red-500 rounded-lg bg-opacity-60 font-weight-bold hover:bg-opacity-80"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-5 h-5 text-white" />
                                            <span className="ms-2">Logout</span>
                                        </button>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    );
}

export default Topnav;
