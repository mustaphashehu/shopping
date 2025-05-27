export const truncateText = (str: string) => {
    if (str.length > 25) {
        return str.slice(0, 25) + ".......";
    }
    return str;
}