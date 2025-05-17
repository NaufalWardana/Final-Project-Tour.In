import { useState, useEffect } from "react";
import { BASE_URL } from "../Helper/endPoint";

// Hook kustom untuk mengelola metode pembayaran
const usePaymentMethods = () => {
  // Variabel state untuk menyimpan daftar metode pembayaran, status loading, dan pesan error
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil semua metode pembayaran
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL.API}/payment-methods`, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setPaymentMethods(data.data || []); // Simpan metode pembayaran yang diambil ke dalam state
      } catch (err) {
        setError(err.message); // Simpan pesan error ke dalam state
      } finally {
        setLoading(false); // Set loading menjadi false setelah permintaan selesai
      }
    };

    fetchPaymentMethods();
  }, []);

  // Kembalikan variabel state untuk digunakan dalam komponen
  return { paymentMethods, loading, error };
};

export default usePaymentMethods;
