export const getURL = () => {
    const url = window.location.origin;
    if (url.includes("https"))
        return "https://nextec-back.vercel.app"
    return "http://localhost:8008"
}