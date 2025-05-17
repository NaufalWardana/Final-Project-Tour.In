import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Helper/endPoint";

// Hook kustom untuk mengelola kategori
const useCategories = () => {
  // Variabel state untuk menyimpan daftar kategori, status loading, dan pesan error
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil semua kategori
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL.API}/categories`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      setCategories(response.data.data); // Simpan kategori yang diambil ke dalam state
    } catch (err) {
      setError(err.message); // Simpan pesan error ke dalam state
    } finally {
      setLoading(false); // Set loading menjadi false setelah permintaan selesai
    }
  };

  // Fungsi untuk membuat kategori baru
  const createCategory = async (categoryData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.API}/create-category`,
        {
          name: categoryData.name,
          imageUrl: categoryData.imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchCategories(); // Refresh daftar kategori setelah pembuatan
      return true;
    } catch (err) {
      return false;
    }
  };

  // Fungsi untuk memperbarui kategori yang ada berdasarkan ID
  const updateCategory = async (id, categoryData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.API}/update-category/${id}`,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchCategories(); // Refresh daftar kategori setelah pembaruan
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Fungsi untuk menghapus kategori berdasarkan ID
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL.API}/delete-category/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchCategories(); // Refresh daftar kategori setelah penghapusan
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Ambil semua kategori saat komponen pertama kali dirender
  useEffect(() => {
    fetchCategories();
  }, []);

  // Kembalikan variabel state dan fungsi untuk digunakan dalam komponen
  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: fetchCategories,
  };
};

export default useCategories;
