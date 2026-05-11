export const getCSRFToken = () => {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');

    return csrfToken;
};
