/* ===== IMPORT DAN DEPENDENCIES ===== */
// Import komponen dan hooks yang dibutuhkan
import { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import useBanner from "../../hooks/useBanner";
import AdminSidebar from "../../components/AdminSidebar";

const BannerManagement = () => {
  /* ===== PENGATURAN STATE DAN HOOKS ===== */
  // Mengambil data dan fungsi banner dari custom hook
  const {
    banners, // Data banner dari API
    loading: bannersLoading, // Status loading data
    createBanner, // Fungsi untuk membuat banner baru
    updateBanner, // Fungsi untuk update banner
    deleteBanner, // Fungsi untuk hapus banner
    refreshBanners, // Fungsi untuk refresh data
  } = useBanner();

  // State untuk kontrol UI
  const [isExpanded, setIsExpanded] = useState(true); // Kontrol lebar sidebar
  const [searchTerm, setSearchTerm] = useState(""); // Input pencarian
  const [filteredBanners, setFilteredBanners] = useState([]); // Hasil pencarian
  const [showForm, setShowForm] = useState(false); // Toggle form modal

  // State untuk form dengan nilai default
  const [formData, setFormData] = useState({
    id: "", // ID banner (kosong untuk banner baru)
    name: "", // Nama banner
    imageUrl: "", // URL gambar banner
    imageFile: null, // File gambar banner
  });

  /* ===== PAGINATION STATE ===== */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ===== EFFECT HOOKS ===== */
  // Effect untuk filter banner berdasarkan pencarian
  useEffect(() => {
    setFilteredBanners(
      banners.filter((banner) =>
        banner.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, banners]);

  /* ===== EVENT HANDLERS ===== */
  // Handler untuk upload image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file), // opsional, untuk preview
      }));
    }
  };

  // Handler untuk input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler untuk submit form (create/update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || (!formData.imageFile && !formData.imageUrl)) {
      alert("Name and Image file are required!");
      return;
    }

    // Buat FormData untuk upload
    const data = new FormData();
    data.append("name", formData.name);

    // Jika ada file, append file
    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    let success = false;
    if (formData.id) {
      // Update banner
      success = await updateBanner(formData.id, data);
    } else {
      // Create banner baru
      success = await createBanner(data);
    }

    if (success) {
      setShowForm(false);
      await refreshBanners();
    }
  };

  // Handler untuk edit banner
  const handleEdit = (banner) => {
    setFormData({
      id: banner.id,
      name: banner.name,
      imageUrl: banner.imageUrl,
    });
    setShowForm(true);
  };

  // Handler untuk navigasi halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddBanner = () => {
    setFormData({
      id: "",
      name: "",
      imageUrl: "",
    });
    setShowForm(true);
  };

  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanners = filteredBanners.slice(startIndex, endIndex);

  if (bannersLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  /* ===== RENDER KOMPONEN ===== */
  // Layout utama dengan sidebar dan konten
  return (
    <div className="min-h-screen w-full bg-gray-900 flex">
      {/* Sidebar dengan toggle ekspansi */}
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Area konten utama */}
      <div className={`w-full p-4 ${isExpanded ? "ml-64" : "pl-14"}`}>
        {/* Header halaman */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Management Banner</h1>
          <p className="text-gray-400">Manage all banner here.</p>
        </div>

        {/* Search dan tombol tambah */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6 mr-12 lg:mr-0">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Banner..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleAddBanner}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Banner
          </button>
        </div>

        {/* Form modal untuk tambah/edit */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg max-h-[90%] overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">
                {formData.id ? "Edit Banner" : "Add Banner"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="text-white">Nama</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nama"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Upload Gambar</label>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="p-2 rounded w-full text-white bg-gray-700"
                    />

                    {formData.imageUrl && (
                      <div className="relative mb-4">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full max-h-48 object-contain rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              imageFile: null,
                              imageUrl: "",
                            }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabel daftar banner */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    URL Gambar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {currentBanners.map((banner) => (
                  <tr key={banner.id} className="text-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {banner.name.length > 20
                        ? `${banner.name.substring(0, 20)}...`
                        : banner.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {banner.imageUrl.length > 20
                        ? `${banner.imageUrl.substring(0, 20)}...`
                        : banner.imageUrl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kontrol pagination */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {[...Array(totalPages)]
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 1)
            )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerManagement;
