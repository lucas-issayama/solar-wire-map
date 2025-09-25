export default function isTypeStructure(type: string) {
  return (
    type == "clamp" ||
    type == "support" ||
    type?.includes("structure") ||
    type?.includes("rail")
  );
}
