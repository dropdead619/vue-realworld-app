export const range = (from, to) => {
    return [...Array(to).keys()].map(el => el + from);
}