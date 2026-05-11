type PayCallback = {
    onSuccess?: (result: unknown) => void;
    onPending?: (result: unknown) => void;
    onError?: (result: unknown) => void;
    onClose?: () => void;
};

export const pay = (snapToken: string, callback?: PayCallback) => {
    window.snap.pay(snapToken, {
        onSuccess: (result) => {
            callback?.onSuccess(result);
        },
        onPending: (result) => {
            callback?.onPending(result);
        },
        onError: (result) => {
            callback?.onError(result);
        },
        onClose: () => {
            callback?.onClose();
        },
    });
};
