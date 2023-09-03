import React from "react";
import moment from "moment/moment";
import Kop from "./Kop";

const PrintComponent = React.forwardRef((props, ref) => {
    const {
        laporan_pemasukan,
        laporan_pengeluaran,
        title,
        jenis,
        dari_tanggal,
        sampai_tanggal,
    } = props;

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
        <div ref={ref} className="print-table">
            <Kop />
            <div className="p-5">
                <div className="flex flex-col items-center">
                    <h5 className="text-2xl font-bold text-center">{title}</h5>
                    <h4 className="text-lg text-center">
                        {dari_tanggal
                            ? `dari ${moment(dari_tanggal).format(
                                  "DD-MM-YYYY"
                              )}`
                            : null}{" "}
                        {sampai_tanggal
                            ? `sampai ${moment(sampai_tanggal).format(
                                  "DD-MM-YYYY"
                              )}`
                            : null}
                    </h4>
                </div>
                <div className="mt-5">
                    <table className="w-full mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {jenis === "pemasukan" ? (
                                <tr className="text-white bg-gray-500 ">
                                    <th className="w-10 px-6 py-3 text-center">
                                        #
                                    </th>
                                    <th className="px-6 py-3">Jenis ATK</th>
                                    <th className="px-6 py-3">Supplier</th>
                                    <th className="px-6 py-3">Jumlah Masuk</th>
                                    <th className="px-6 py-3">Tanggal Masuk</th>
                                </tr>
                            ) : (
                                <tr className="text-white bg-gray-500 ">
                                    <th className="w-10 px-6 py-3 text-center">
                                        #
                                    </th>
                                    <th className="px-6 py-3">Jenis ATK</th>
                                    <th className="px-6 py-3">Jumlah Keluar</th>
                                    <th className="px-6 py-3">
                                        Tanggal Keluar
                                    </th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {jenis === "pemasukan"
                                ? laporan_pemasukan.data.map((item, index) => (
                                      <tr
                                          key={index}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                      >
                                          <td className="px-6 py-3 text-center">
                                              {laporan_pemasukan.from + index}
                                          </td>
                                          <td className="px-6 py-3">
                                              {item.jenis_atk}
                                          </td>
                                          <td className="px-6 py-3">
                                              {item.supplier.nama_supplier}
                                          </td>
                                          <td className="px-6 py-3">
                                              {item.jumlah_masuk} {item.satuan}
                                          </td>
                                          <td className="px-6 py-3">
                                              {moment(
                                                  item.tanggal_masuk
                                              ).format("DD-MM-YYYY")}
                                          </td>
                                      </tr>
                                  ))
                                : laporan_pengeluaran.data.map(
                                      (item, index) => (
                                          <tr
                                              key={index}
                                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                          >
                                              <td className="px-6 py-3 text-center">
                                                  {laporan_pengeluaran.from +
                                                      index}
                                              </td>
                                              <td className="px-6 py-3">
                                                  {item.jenis_atk}
                                              </td>
                                              <td className="px-6 py-3">
                                                  {item.jumlah_keluar}{" "}
                                                  {item.nama_satuan}
                                              </td>
                                              <td className="px-6 py-3">
                                                  {moment(
                                                      item.created_at
                                                  ).format("DD-MM-YYYY")}
                                              </td>
                                          </tr>
                                      )
                                  )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="signature-container">
                <div className="text-center ">
                    <p>Banda Aceh, {currentDateFormatted}</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p className="font-bold underline uppercase">
                        T.FAISAL NOOR HIDAYAD
                    </p>
                    <p>NIP. 197704112009101001</p>
                </div>
            </div>
        </div>
    );
});

export default PrintComponent;
