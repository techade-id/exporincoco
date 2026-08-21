export type BlogSlug =
  | "indonesian-export-partner"
  | "charcoal-quality-specs"
  | "shell-to-container";

export type BlogPost = {
  slug: BlogSlug;
  image: string;
  date: string;
  author: string;
  en: { title: string; excerpt: string; body: string[] };
  id: { title: string; excerpt: string; body: string[] };
};

export const posts: BlogPost[] = [
  {
    slug: "indonesian-export-partner",
    image: "/images/blog-partner.jpg",
    date: "2026-03-12",
    author: "Eksporin Coco",
    en: {
      title:
        "What International Buyers Should Look for in an Indonesian Export Partner",
      excerpt:
        "A practical checklist for importers evaluating coconut charcoal and coconut-based suppliers from Indonesia.",
      body: [
        "Indonesia is one of the world’s most important sources of coconut charcoal briquettes, copra, coconut oil, and related coconut products. For international buyers, the challenge is rarely finding a supplier — it is finding one that can repeat the same quality, documents, and loading schedule across multiple shipments.",
        "Start with identity and communication. A reliable partner should have a clear legal entity, a working office or workshop address, and a sales contact that responds in English with product specs, packing photos, and realistic lead times. WhatsApp is common in this trade; it should complement — not replace — written quotations and packing lists.",
        "Ask for specification ranges, not marketing adjectives. Moisture, ash, fixed carbon, calorific value, shape, packing, and container loading weights tell you more than “premium” or “export quality.” Confirm whether figures are typical production grades and how they are checked before stuffing.",
        "Supply reliability matters as much as price. Coconut raw material is seasonal and regional. A partner with a network of producers across Indonesia can absorb local shortages better than a single small factory. Request recent loading photos, a sample policy, and a clear MOQ.",
        "Finally, align on payment, inspection, and after-sales handling of claims. The best Indonesian export partners treat the first container as the start of a long-term program, not a one-off sale.",
      ],
    },
    id: {
      title:
        "Yang Perlu Diperhatikan Pembeli Internasional saat Memilih Mitra Ekspor Indonesia",
      excerpt:
        "Daftar periksa praktis bagi importir yang menilai pemasok arang kelapa dan produk berbasis kelapa dari Indonesia.",
      body: [
        "Indonesia adalah salah satu sumber terpenting di dunia untuk briket arang kelapa, kopra, minyak kelapa, dan produk kelapa terkait. Bagi pembeli internasional, tantangannya jarang mencari pemasok — melainkan menemukan mitra yang dapat mengulang mutu, dokumen, dan jadwal stuffing yang sama di banyak pengiriman.",
        "Mulailah dari identitas dan komunikasi. Mitra yang andal memiliki entitas hukum yang jelas, alamat kantor atau workshop, serta kontak penjualan yang merespons dalam bahasa Inggris dengan spek produk, foto packing, dan lead time yang realistis. WhatsApp lazim dalam perdagangan ini; seharusnya melengkapi — bukan menggantikan — penawaran tertulis dan packing list.",
        "Minta rentang spesifikasi, bukan kata sifat pemasaran. Kadar air, abu, fixed carbon, nilai kalor, bentuk, packing, dan bobot muat kontainer jauh lebih informatif daripada “premium” atau “export quality.” Pastikan angka tersebut adalah grade produksi tipikal dan bagaimana pemeriksaannya sebelum stuffing.",
        "Keandalan pasokan sama pentingnya dengan harga. Bahan baku kelapa bersifat musiman dan regional. Mitra dengan jaringan produsen di berbagai wilayah Indonesia lebih mampu menahan kekurangan lokal dibanding satu pabrik kecil. Minta foto stuffing terbaru, kebijakan sampel, dan MOQ yang jelas.",
        "Terakhir, selaraskan pembayaran, inspeksi, dan penanganan klaim. Mitra ekspor Indonesia terbaik memperlakukan kontainer pertama sebagai awal program jangka panjang, bukan penjualan sekali jalan.",
      ],
    },
  },
  {
    slug: "charcoal-quality-specs",
    image: "/images/briquettes.jpg",
    date: "2026-04-02",
    author: "Eksporin Coco",
    en: {
      title:
        "Coconut Charcoal Briquettes: Quality Specs That Matter for BBQ and Shisha Markets",
      excerpt:
        "Ash, moisture, burning time, and packing — the numbers buyers actually compare before placing a container.",
      body: [
        "Shisha and BBQ buyers judge coconut charcoal on performance they can feel: ignition time, spark, odor, ash color, and how long a cube or hexagonal stick holds heat. Those results come from a small set of laboratory and production specs.",
        "Ash content is usually the first filter. Lower ash means a cleaner table, fewer complaints from end users, and a more “white ash” look that many Middle East and European buyers expect. Moisture must stay low enough for stable burning and to avoid extra freight weight.",
        "Fixed carbon and calorific value indicate energy density. Dense, well-pressed briquettes made from coconut shell charcoal typically burn longer than mixed biomass cubes. Shape and size must match the destination: 25 mm cubes for many shisha markets, hexagonal or finger shapes for BBQ.",
        "Packing is part of the product. Inner boxes, master cartons, palletizing, and private-label printing affect both landed cost and brand presentation. Confirm pieces per box, boxes per carton, and cartons per container before you lock a price.",
        "When you request a quote from Eksporin Coco, share your target market, preferred shape, and whether you need OEM branding. We will align typical Indonesian production grades with your application and loading plan.",
      ],
    },
    id: {
      title:
        "Briket Arang Kelapa: Spek Mutu yang Penting untuk Pasar BBQ dan Shisha",
      excerpt:
        "Abu, kadar air, waktu bakar, dan packing — angka yang benar-benar dibandingkan pembeli sebelum memesan kontainer.",
      body: [
        "Pembeli shisha dan BBQ menilai arang kelapa dari performa yang terasa: waktu nyala, percikan, bau, warna abu, dan berapa lama kubus atau stick heksagonal menahan panas. Hasil itu berasal dari sejumlah spek laboratorium dan produksi.",
        "Kadar abu biasanya menjadi filter pertama. Abu lebih rendah berarti meja lebih bersih, lebih sedikit keluhan pengguna, dan tampilan “white ash” yang diharapkan banyak pembeli Timur Tengah dan Eropa. Kadar air harus cukup rendah agar pembakaran stabil dan tidak menambah bobot angkut.",
        "Fixed carbon dan nilai kalor menunjukkan kepadatan energi. Briket padat dari arang tempurung kelapa biasanya terbakar lebih lama daripada kubus biomassa campuran. Bentuk dan ukuran harus sesuai tujuan: kubus 25 mm untuk banyak pasar shisha, heksagonal atau finger untuk BBQ.",
        "Packing adalah bagian dari produk. Inner box, master carton, palet, dan cetakan private label memengaruhi landed cost sekaligus presentasi merek. Pastikan jumlah pieces per box, box per karton, dan karton per kontainer sebelum mengunci harga.",
        "Saat meminta penawaran ke Eksporin Coco, sampaikan pasar tujuan, bentuk yang diinginkan, dan apakah Anda membutuhkan merek OEM. Kami akan menyesuaikan grade produksi Indonesia yang tipikal dengan aplikasi dan rencana stuffing Anda.",
      ],
    },
  },
  {
    slug: "shell-to-container",
    image: "/images/production.jpg",
    date: "2026-05-18",
    author: "Eksporin Coco",
    en: {
      title:
        "From Coconut Shell to Export Container: How Indonesian Charcoal Supply Works",
      excerpt:
        "A short tour of sourcing, carbonization, packing, and stuffing for coconut-based charcoal exports.",
      body: [
        "Coconut shell charcoal starts as a by-product of copra and coconut processing. Shells are collected from mills and farms, dried, then carbonized in kilns. The resulting lump charcoal can be sold as-is or crushed, mixed with a food-grade binder, and pressed into briquettes.",
        "Quality control happens in layers: raw shell selection, kiln temperature and time, cooling, screening, moisture checks, and — for briquettes — mixing ratios and drying after pressing. Skipping any of these steps shows up later as sparks, odor, fast burn, or high ash.",
        "Export packing is planned around the buyer’s market. Hookah cubes often go into printed inner boxes and master cartons; industrial lump charcoal may ship in PP or jumbo bags. Photos of packing and stuffing protect both sides if a claim arises after arrival.",
        "A 20 ft or 40 ft container is the usual commercial unit. Loading weights depend on shape, packing, and whether pallets are used. Freight, inspection, and document timing should be agreed together with production lead time.",
        "Eksporin Coco connects this chain — local producers across Indonesia, export packing, and buyer communication — so importers can focus on their market rather than coordinating every village supplier themselves.",
      ],
    },
    id: {
      title:
        "Dari Tempurung Kelapa ke Kontainer Ekspor: Cara Kerja Pasokan Arang Indonesia",
      excerpt:
        "Tur singkat tentang sourcing, karbonisasi, packing, dan stuffing untuk ekspor arang berbasis kelapa.",
      body: [
        "Arang tempurung kelapa berawal sebagai produk samping pengolahan kopra dan kelapa. Tempurung dikumpulkan dari pabrik dan petani, dikeringkan, lalu dikarbonisasi di kiln. Arang bongkah hasilnya dapat dijual apa adanya atau dihancurkan, dicampur binder food-grade, dan dicetak menjadi briket.",
        "Pengendalian mutu terjadi berlapis: seleksi tempurung, suhu dan waktu kiln, pendinginan, ayakan, cek kadar air, dan — untuk briket — rasio campuran serta pengeringan setelah cetak. Melewatkan salah satu langkah akan muncul kemudian sebagai percikan, bau, bakar cepat, atau abu tinggi.",
        "Packing ekspor direncanakan sesuai pasar pembeli. Kubus shisha sering masuk inner box tercetak dan master carton; arang bongkah industri dapat dikirim dalam karung PP atau jumbo bag. Foto packing dan stuffing melindungi kedua pihak jika ada klaim setelah tiba.",
        "Kontainer 20 ft atau 40 ft adalah satuan komersial yang lazim. Bobot muat bergantung pada bentuk, packing, dan apakah memakai palet. Freight, inspeksi, dan waktu dokumen harus disepakati bersama lead time produksi.",
        "Eksporin Coco menghubungkan rantai ini — produsen lokal di Indonesia, packing ekspor, dan komunikasi pembeli — agar importir dapat fokus pada pasarnya, bukan mengoordinasikan setiap pemasok desa sendiri.",
      ],
    },
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
