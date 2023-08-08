import Sidenav from "@/components/Sidenav";
import Topnav from "@/components/Topnav";
import { usePage } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

function AppLayout({ children }) {
    const { sessions } = usePage().props;

    React.useEffect(() => {
        if (sessions?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: sessions.success,
                showConfirmButton: true,
            });
        }

        if (sessions?.error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: sessions.error,
                showConfirmButton: true,
            });
        }
    }, [sessions]);

    return (
        <div className="flex w-full min-h-screen bg-gray-100 dark:bg-slate-900">
            {/* sidebar */}
            <Sidenav />

            <div className="flex flex-col w-full p-4">
                {/* header */}
                <Topnav />
                <main className="py-5">{children}</main>
            </div>
        </div>
    );
}

export default AppLayout;
