async function uploadImage(token: string, file: any) {
  const formData = new FormData();
  if (file) formData.append("files", file);

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
}

export default uploadImage;
