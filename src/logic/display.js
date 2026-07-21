


export const dispStr = (text) => {
    if(text.trim().length<=1) return text;
    return text.trim().charAt(0).toUpperCase() + text.trim().slice(1, text.length);
}