export const toTop = (): void => {
    window.scrollTo(0, 0);
}

export const checkUser = () => {
    return localStorage.getItem('stackuser') !== null;
}

export const getUser = () => {
    return localStorage.getItem('stackuser');
}