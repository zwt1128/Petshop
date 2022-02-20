export function uselist1Content() {
    const list1Content = useState("list1Content", () => []);
    return {
        list1Content
    };
}
