import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Helper/endPoint";

// Hook kustom untuk mengelola promo
const usePromos = () => {
  // Variabel state untuk menyimpan daftar promo, status loading, dan pesan error
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil semua promo
  const fetchPromos = async () => {
    try {
      const response = await axios.get(`${BASE_URL.API}/promos`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      setPromos(response.data.data); // Simpan promo yang diambil ke dalam state
    } catch (err) {
      setError(err.message); // Simpan pesan error ke dalam state
    } finally {
      setLoading(false); // Set loading menjadi false setelah permintaan selesai
    }
  };

  // Fungsi untuk membuat promo baru
  const createPromo = async (promoData) => {
    try {
      // Validasi field wajib
      if (!promoData.title || !promoData.promo_code) {
        throw new Error("Title dan Promo Code wajib diisi!");
      }

      promoData.promo_discount_price = Number(promoData.promo_discount_price);
      promoData.minimum_claim_price = Number(promoData.minimum_claim_price);

      const response = await axios.post(
        `${BASE_URL.API}/create-promo`,
        promoData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchPromos(); // Refresh daftar promo setelah pembuatan
      return { success: true };
    } catch (err) {
      console.error("Detail error:", err.response?.data, err.message); // Log detail error
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  // Fungsi untuk memperbarui promo yang ada berdasarkan ID
  const updatePromo = async (id, promoData) => {
    try {
      // Pastikan promo_discount_price dan minimum_claim_price adalah angka
      promoData.promo_discount_price = Number(promoData.promo_discount_price);
      promoData.minimum_claim_price = Number(promoData.minimum_claim_price);

      const response = await axios.post(
        `${BASE_URL.API}/update-promo/${id}`,
        promoData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchPromos(); // Refresh daftar promo setelah pembaruan
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Fungsi untuk menghapus promo berdasarkan ID
  const deletePromo = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL.API}/delete-promo/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchPromos(); // Refresh daftar promo setelah penghapusan
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Ambil semua promo saat komponen pertama kali dirender
  useEffect(() => {
    fetchPromos();
  }, []);

  // Kembalikan variabel state dan fungsi untuk digunakan dalam komponen
  return {
    promos,
    loading,
    error,
    createPromo,
    updatePromo,
    deletePromo,
    refreshPromos: fetchPromos,
  };
};

export default usePromos;
