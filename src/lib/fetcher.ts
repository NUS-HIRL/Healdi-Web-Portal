const fetcher = async (path: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: localStorage.getItem("accessToken") as string
    }
  })
  return res.json()
}

export default fetcher
