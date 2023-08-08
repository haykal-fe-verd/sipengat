import React from "react";
import Logo from "@/assets/Logo.png";

function Kop() {
    return (
        <>
            <div className="flex items-center justify-between pt-5">
                <div className="flex items-center justify-end w-1/4">
                    <img src={Logo} alt="Logo Kop" height={100} width={100} />
                </div>
                <div className="w-full text-center ">
                    <h1 className="text-xl font-bold">
                        KOMISI INDEPENDEN PEMILIHAN
                    </h1>
                    <h1 className="text-xl font-bold">KOTA BANDA ACEH</h1>
                    <p className="font-semibold text-md">
                        Jln. Pocut Baren No. 20, Kota Banda Aceh, 23122
                    </p>
                    <p className="text-sm font-semibold">
                        Telp. (0651) 637872 - 637874 Fax. (0651) 637873
                    </p>
                    <p className="text-xs">
                        Email : sekretariat.kipbandaaceh@gmail.com,
                        kpu.kotabandaaceh@gmail.com
                    </p>
                </div>
            </div>
            <hr className="mx-5 mt-5 border-gray-500" />
            <hr className="mx-5 mt-1 border-gray-500" />
        </>
    );
}

export default Kop;
