document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", jpg: "1.jpg", price: 20000 },
      { id: 2, name: "Arabic Blend", jpg: "2.jpg", price: 25000 },
      { id: 3, name: "Primo Passo", jpg: "3.jpg", price: 30000 },
      { id: 4, name: "Aceh Gayo", jpg: "4.jpg", price: 35000 },
      { id: 5, name: "Sumatra Mandheling", jpg: "5.jpg", price: 40000 },
    ],
  }));

  // Konversi ke rupiah
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        // Jika belum ada, tambahkan item baru
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika sudah ada, perbarui quantity dan total item
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item; // Tetap item lama
          } else {
            // Tambah quantity dan hitung ulang total item
            item.quantity++;
            item.total = item.price * item.quantity;
            this.total += item.price; // Update total keranjang
            this.quantity++;
            return item;
          }
        });
      }

      console.log("Total:", this.total);
    },

    remove(item) {
      // Hapus item dari keranjang dan perbarui total
      this.items = this.items.filter((i) => i.id !== item.id);
      this.total -= item.total;
      this.quantity -= item.quantity;
    },

    // Update total setiap kali kuantitas item berubah
    updateTotal() {
      this.total = this.items.reduce((sum, item) => sum + item.total, 0);
    },

    // Fungsi checkout
    checkout() {
      if (this.items.length === 0) {
        alert("Keranjang kosong. Silakan tambahkan produk terlebih dahulu.");
        return;
      }

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      if (!name || !email || !phone) {
        alert(
          "Harap lengkapi semua data pelanggan sebelum melanjutkan checkout."
        );
        return;
      }

      const checkoutData = {
        items: this.items,
        total: this.total,
        customer: { name, email, phone },
      };

      console.log("Checkout data:", checkoutData);

      // Simulasi redirect ke halaman pembayaran atau kode keluar
      alert("Checkout berhasil! Anda akan diarahkan ke halaman pembayaran.");

      // Reset keranjang setelah checkout
      this.items = [];
      this.total = 0;
      this.quantity = 0;
    },
  });
});
