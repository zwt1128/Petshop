export function usecityContent() {
    const cityContent = useState("cityContent", () => []);
    return {
        cityContent
    };
}
