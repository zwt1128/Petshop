export function uselist2Content() {
    const list2Content = useState("list2Content", () => []);
    return {
        list2Content
    };
}
