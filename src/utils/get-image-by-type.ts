import { Product } from "@/types/product";

export function getImageUrlByType(product: Product) {
  let imageUrl =
    "https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/product.png";
  if (product?.type == "kit") {
    imageUrl = `https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/kits/${product?.inverterManufacturer?.toLowerCase()}.png`;
  }

  if (product?.type == "inverter") {
    imageUrl = `https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/products/inverter.png`;
  }
  if (product?.type == "module") {
    imageUrl = `https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/products/module.png`;
  }
  if (product?.type == "cable") {
    imageUrl = `https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/products/cable.png`;
  }
  if (product?.type == "connector") {
    imageUrl = `https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/products/connector.png`;
  }
  if (product?.type == "stringbox") {
    imageUrl = `https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/products/stringbox.png`;
  }
  if (
    product?.type == "clamp" ||
    product?.type == "rail" ||
    product?.type == "rail_connector" ||
    product?.type == "support"
  ) {
    imageUrl = `https://mxwqlouaaupkgunfdbku.supabase.co/storage/v1/object/public/corsolar/ecommerce/products/structure.png`;
  }

  return imageUrl;
}
