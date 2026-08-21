export type ProductSlug =
  | "coconut-charcoal-briquettes"
  | "copra"
  | "coconut-oil"
  | "coconut-shell-charcoal"
  | "wood-charcoal";

export type Product = {
  slug: ProductSlug;
  image: string;
  specs: { label: string; value: string }[];
  en: {
    name: string;
    short: string;
    description: string;
  };
  id: {
    name: string;
    short: string;
    description: string;
  };
};

export const products: Product[] = [
  {
    slug: "coconut-charcoal-briquettes",
    image: "/images/briquettes.jpg",
    en: {
      name: "Coconut Charcoal Briquettes",
      short:
        "Clean-burning cube and hexagonal briquettes for shisha and BBQ export markets.",
      description:
        "Premium coconut charcoal briquettes made from selected Indonesian coconut shells. Controlled carbonization and pressing produce a dense, low-ash briquette with long, stable heat — suitable for shisha, BBQ, and food-service buyers who need consistent quality shipment after shipment.",
    },
    id: {
      name: "Briket Arang Kelapa",
      short:
        "Briket kubus dan heksagonal yang terbakar bersih untuk pasar shisha dan BBQ.",
      description:
        "Briket arang kelapa premium dari tempurung kelapa Indonesia pilihan. Karbonisasi dan pencetakan yang terkontrol menghasilkan briket padat, rendah abu, dengan panas yang tahan lama dan stabil — cocok untuk pembeli shisha, BBQ, dan food service yang membutuhkan mutu konsisten di setiap pengiriman.",
    },
    specs: [
      { label: "Product Type", value: "Coconut charcoal briquettes" },
      { label: "Shape", value: "Cube / Hexagonal / Finger / Custom" },
      { label: "Size", value: "25 × 25 × 25 mm (cube) or as requested" },
      { label: "Fixed Carbon", value: "≥ 80%" },
      { label: "Moisture Content", value: "≤ 6%" },
      { label: "Ash Content", value: "1.8–2.5%" },
      { label: "Calorific Value", value: "7,000–7,500 kcal/kg" },
      { label: "Burning Time", value: "90–120 minutes" },
      { label: "Ignition Time", value: "Approx. 8–12 minutes" },
      { label: "Application", value: "Shisha / BBQ / food service" },
      { label: "Packing", value: "Inner box + master carton / custom OEM" },
      { label: "MOQ", value: "1 × 20 ft container (confirm with sales)" },
      {
        label: "Loading Capacity",
        value: "20 ft ~10–12 MT · 40 HQ ~18–22 MT",
      },
      { label: "Origin", value: "Indonesia" },
    ],
  },
  {
    slug: "copra",
    image: "/images/copra.jpg",
    en: {
      name: "Copra",
      short:
        "Dried coconut meat from mature Indonesian coconuts for oil mills and traders.",
      description:
        "Copra is the dried kernel of mature coconuts, supplied for coconut oil extraction and further processing. We work with local producers to deliver sun-dried or kiln-dried copra with competitive oil content, controlled moisture, and export-ready packing.",
    },
    id: {
      name: "Kopra",
      short:
        "Daging kelapa kering dari kelapa Indonesia matang untuk pabrik minyak dan trader.",
      description:
        "Kopra adalah daging kelapa matang yang dikeringkan, dipasok untuk ekstraksi minyak kelapa dan pengolahan lanjutan. Kami bekerja dengan produsen lokal untuk menyediakan kopra kering matahari atau kiln dengan kadar minyak kompetitif, kelembapan terkontrol, dan kemasan siap ekspor.",
    },
    specs: [
      { label: "Product Type", value: "Dried coconut meat (copra)" },
      { label: "Color", value: "White to light brown" },
      { label: "Moisture Content", value: "6–8%" },
      { label: "Oil Content", value: "60–65%" },
      { label: "FFA", value: "Typically ≤ 1% (grade dependent)" },
      { label: "Texture", value: "Firm, fully dried mature kernel" },
      { label: "Application", value: "Coconut oil milling / feed / trading" },
      { label: "Packing", value: "PP bags 50–80 kg / as requested" },
      { label: "MOQ", value: "1 × 20 ft container (confirm with sales)" },
      { label: "Loading Capacity", value: "20 ft ~16–18 MT" },
      { label: "Origin", value: "Indonesia" },
    ],
  },
  {
    slug: "coconut-oil",
    image: "/images/oil-generic.jpg",
    en: {
      name: "Coconut Oil",
      short:
        "Crude, RBD, and virgin coconut oil sourced from Indonesian copra and fresh coconut.",
      description:
        "Indonesian coconut oil for food, oleochemical, and personal-care buyers. Depending on your market, we can arrange crude coconut oil (CNO), refined bleached deodorized (RBD) oil, or virgin coconut oil in flexibag, IBC, or drum packing.",
    },
    id: {
      name: "Minyak Kelapa",
      short:
        "Minyak kelapa mentah, RBD, dan virgin dari kopra serta kelapa segar Indonesia.",
      description:
        "Minyak kelapa Indonesia untuk pembeli makanan, oleokimia, dan personal care. Sesuai kebutuhan pasar, kami dapat mengatur CNO, minyak RBD, atau virgin coconut oil dalam kemasan flexibag, IBC, atau drum.",
    },
    specs: [
      { label: "Product Type", value: "CNO / RBD / Virgin coconut oil" },
      { label: "Appearance", value: "Clear to pale yellow (grade dependent)" },
      { label: "FFA (CNO)", value: "Typically ≤ 1–3%" },
      { label: "Moisture & Impurities", value: "≤ 0.5%" },
      { label: "Odor", value: "Characteristic coconut / neutral (RBD)" },
      { label: "Application", value: "Food / oleochemical / cosmetics" },
      { label: "Packing", value: "Flexibag / IBC / 190 kg drums" },
      { label: "MOQ", value: "1 × 20 ft container (confirm with sales)" },
      { label: "Loading Capacity", value: "20 ft flexibag ~20–21 MT" },
      { label: "Origin", value: "Indonesia" },
    ],
  },
  {
    slug: "coconut-shell-charcoal",
    image: "/images/shell-charcoal.jpg",
    en: {
      name: "Coconut Shell Charcoal",
      short:
        "High-calorific lump charcoal from natural coconut shells for BBQ, shisha, and industry.",
      description:
        "Coconut shell charcoal produced from natural Indonesian coconut shells through controlled carbonization. It offers high calorific value, long burning time, and low ash — used as BBQ and industrial fuel, or as raw material for coconut charcoal briquettes.",
    },
    id: {
      name: "Arang Tempurung Kelapa",
      short:
        "Arang bongkah berkadar kalori tinggi dari tempurung kelapa alami.",
      description:
        "Arang tempurung kelapa dari tempurung kelapa Indonesia melalui karbonisasi terkontrol. Memiliki nilai kalor tinggi, waktu bakar lama, dan abu rendah — digunakan sebagai bahan bakar BBQ dan industri, atau bahan baku briket arang kelapa.",
    },
    specs: [
      { label: "Product Type", value: "Coconut shell charcoal" },
      { label: "Fixed Carbon", value: "75–85%" },
      { label: "Moisture Content", value: "5–8%" },
      { label: "Ash Content", value: "2–5%" },
      { label: "Calorific Value", value: "7,000–7,500 kcal/kg" },
      { label: "Burning Time", value: "Long-lasting and stable heat" },
      { label: "Appearance", value: "Black charcoal shell pieces" },
      { label: "Form", value: "Lump / granule / crushed" },
      {
        label: "Application",
        value: "BBQ / shisha briquette / industrial fuel / heating",
      },
      { label: "Packing", value: "PP bag / jumbo bag" },
      { label: "MOQ", value: "To be confirmed with production / QC" },
      {
        label: "Loading Capacity",
        value: "20 ft 18–20 MT · 40 ft 25–28 MT",
      },
      { label: "Origin", value: "Indonesia" },
    ],
  },
  {
    slug: "wood-charcoal",
    image: "/images/wood-charcoal.jpg",
    en: {
      name: "Wood Charcoal",
      short:
        "Hardwood charcoal for BBQ and industrial heating, sourced from Indonesian producers.",
      description:
        "Wood charcoal supplied through our producer network across Indonesia. Suitable for restaurant BBQ, retail packing, and industrial heating where buyers need reliable volume and export documentation.",
    },
    id: {
      name: "Arang Kayu",
      short:
        "Arang kayu keras untuk BBQ dan pemanas industri dari produsen Indonesia.",
      description:
        "Arang kayu yang dipasok melalui jaringan produsen kami di Indonesia. Cocok untuk BBQ restoran, kemasan ritel, dan pemanas industri di mana pembeli membutuhkan volume yang andal dan dokumen ekspor.",
    },
    specs: [
      { label: "Product Type", value: "Hardwood charcoal" },
      { label: "Fixed Carbon", value: "70–80%" },
      { label: "Moisture Content", value: "≤ 8%" },
      { label: "Ash Content", value: "3–6%" },
      { label: "Calorific Value", value: "6,500–7,200 kcal/kg" },
      { label: "Form", value: "Lump / mixed size" },
      { label: "Application", value: "BBQ / restaurant / industrial heating" },
      { label: "Packing", value: "10–20 kg bags / jumbo bag" },
      { label: "MOQ", value: "1 × 20 ft container (confirm with sales)" },
      { label: "Loading Capacity", value: "20 ft ~18–20 MT" },
      { label: "Origin", value: "Indonesia" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function relatedProducts(slug: ProductSlug, count = 3) {
  return products.filter((product) => product.slug !== slug).slice(0, count);
}
