// Data Produk
const products = [
  {
    id: 1,
    name: "MacBook Pro M2",
    price: 21500000,
    description: "Laptop kencang untuk profesional kreatif.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    category: "Laptop",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 18900000,
    description: "Smartphone dengan kamera titanium tercanggih.",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
    category: "Smartphone",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 5200000,
    description: "Headphone noise cancelling terbaik di kelasnya.",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    category: "Aksesoris",
  },
  {
    id: 4,
    name: "Samsung Galaxy S23",
    price: 12500000,
    description: "Flagship Android dengan layar super AMOLED.",
    image:
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800",
    category: "Smartphone",
  },
  {
    id: 5,
    name: "Logitech MX Master 3S",
    price: 1500000,
    description: "Mouse ergonomis untuk produktivitas tinggi.",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800",
    category: "Aksesoris",
  },
  {
    id: 6,
    name: "Dell XPS 13",
    price: 17800000,
    description: "Laptop Windows paling compact dan elegan.",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800",
    category: "Laptop",
  },
];

// Format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// DOM Elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const emptyState = document.getElementById("empty-state");
const resetBtn = document.getElementById("resetBtn");

// Fungsi Render Produk
function renderProducts(data) {
  productGrid.innerHTML = "";

  if (data.length === 0) {
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }

  data.forEach((product) => {
    const card = `
                    <div class="col">
                        <div class="card shadow-sm position-relative">
                            <span class="category-badge bg-primary text-white shadow-sm">${
                              product.category
                            }</span>
                            <img src="${
                              product.image
                            }" class="card-img-top" alt="${product.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold mb-1">${
                                  product.name
                                }</h5>
                                <p class="card-text text-muted small mb-3">${
                                  product.description
                                }</p>
                                <div class="mt-auto d-flex justify-content-between align-items-center">
                                    <span class="price-tag">${formatRupiah(
                                      product.price
                                    )}</span>
                                    <button class="btn btn-primary btn-sm">Beli</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    productGrid.innerHTML += card;
  });
}

// Fungsi Filter & Sort Utama
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const sortOrder = priceSort.value;

  let filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "Semua" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sortOrder === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// Event Listeners
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
priceSort.addEventListener("change", applyFilters);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "Semua";
  priceSort.value = "default";
  renderProducts(products);
});

// Initial Render
window.onload = () => renderProducts(products);
