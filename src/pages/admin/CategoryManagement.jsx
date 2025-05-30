/* ===== IMPORT DEPENDENCIES ===== */
// Import hooks dan komponen yang dibutuhkan
import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import useCategories from "../../hooks/useCategory";
import AdminSidebar from "../../components/AdminSidebar";

const CategoryManagement = () => {
  /* ===== STATE MANAGEMENT ===== */
  // State untuk pencarian kategori
  const [searchTerm, setSearchTerm] = useState("");

  // Mengambil data dan fungsi kategori dari custom hook
  const {
    categories, // Data kategori dari API
    loading, // Status loading
    error, // Pesan error jika ada
    createCategory, // Fungsi untuk membuat kategori baru
    updateCategory, // Fungsi untuk update kategori
    deleteCategory, // Fungsi untuk hapus kategori
  } = useCategories();

  // State untuk UI
  const [selectedCategory, setSelectedCategory] = useState(null); // Kategori yang dipilih untuk edit
  const [showEditModal, setShowEditModal] = useState(false); // Toggle modal edit
  const [showCreateModal, setShowCreateModal] = useState(false); // Toggle modal tambah
  const [isExpanded, setIsExpanded] = useState(true); // Kontrol sidebar

  /* ===== PAGINATION STATE ===== */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCategories = categories?.filter((category) => {
    return category.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(
    (filteredCategories?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const uploadImageAndGetUrl = async (file) => {
    // simulasikan upload dan return URL
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file)); // hanya local preview, bukan untuk production
      }, 1000);
    });
  };
  /* ===== EVENT HANDLERS ===== */
  // Handler untuk membuat kategori baru
  const handleCreateCategory = async (categoryData) => {
    let imageUrl = categoryData.imageUrl;
    if (categoryData.imageFile) {
      imageUrl = await uploadImageAndGetUrl(categoryData.imageFile);
    }

    const success = await createCategory({
      name: categoryData.name,
      imageUrl,
    });

    if (success) {
      setShowCreateModal(false);
      setSelectedCategory(null);
    }
  };

  // Handler untuk update kategori
  const handleUpdateCategory = async () => {
    if (selectedCategory) {
      const success = await updateCategory(selectedCategory.id, {
        name: selectedCategory.name,
        imageUrl: selectedCategory.imageUrl,
      });
      if (success) {
        setShowEditModal(false);
        setSelectedCategory(null);
      }
    }
  };

  // Handler untuk menghapus kategori
  const handleDeleteCategory = async (id) => {
    const success = await deleteCategory(id);
    if (success) {
      setSelectedCategory(null);
    }
  };

  /* ===== RENDER CONDITIONS ===== */
  // Tampilkan loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Tampilkan pesan error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h3 className="text-xl">Error: {error}</h3>
        </div>
      </div>
    );
  }

  /* ===== MAIN RENDER ===== */
  return (
    <div className="min-h-screen w-full bg-gray-900 flex">
      {/* Sidebar */}
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      {/* Konten Utama */}
      <div
        className={`w-full p-4 transition-all duration-300 ${
          isExpanded ? "ml-64" : "pl-14"
        }`}
      >
        {/* Header dan Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Management Category</h1>
          <p className="text-gray-400">Manage data category here</p>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6 mr-12 lg:mr-0">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search category..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategory({
                name: "",
                imageUrl: null,
                imageFile: null,
              });
              setShowCreateModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Category
          </button>
        </div>
        {/* Tabel Kategori */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Gambar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {currentCategories?.map((category) => (
                  <tr key={category.id} className="text-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-9 text-sm font-medium h-full flex gap-4">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowEditModal(true);
                        }}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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
        {/* Pagination */}
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
        {/* Modal Form Tambah */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-white mb-4">
                Tambah Kategori
              </h2>
              <label className="block text-gray-400 mb-2">Nama Kategori</label>
              <input
                type="text"
                placeholder="Nama Kategori"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                value={selectedCategory?.name || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />

              <label className="block text-gray-400 mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imagePreviewUrl = URL.createObjectURL(file);
                    setSelectedCategory({
                      ...selectedCategory,
                      imageUrl: imagePreviewUrl,
                      imageFile: file,
                    });
                  }
                }}
              />

              {selectedCategory?.imageUrl && (
                <div className="relative mb-4">
                  <img
                    src={selectedCategory.imageUrl}
                    alt="Preview"
                    className="w-full max-h-48 object-contain rounded"
                  />
                  <button
                    onClick={() =>
                      setSelectedCategory({
                        ...selectedCategory,
                        imageUrl: null,
                        imageFile: null,
                      })
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => handleCreateCategory(selectedCategory)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal Form Edit */}
        {showEditModal && selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-white mb-4">
                Edit Kategori
              </h2>
              <label className="block text-gray-400 mb-2">Nama Kategori</label>
              <input
                type="text"
                placeholder="Nama Kategori"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />

              <label className="block text-gray-400 mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imagePreviewUrl = URL.createObjectURL(file);
                    setSelectedCategory({
                      ...selectedCategory,
                      imageUrl: imagePreviewUrl,
                      imageFile: file,
                    });
                  }
                }}
              />

              {selectedCategory?.imageUrl && (
                <div className="relative mb-4">
                  <img
                    src={selectedCategory.imageUrl}
                    alt="Preview"
                    className="w-full max-h-48 object-contain rounded "
                  />
                  <button
                    onClick={() =>
                      setSelectedCategory({
                        ...selectedCategory,
                        imageUrl: null,
                        imageFile: null,
                      })
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleUpdateCategory}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
