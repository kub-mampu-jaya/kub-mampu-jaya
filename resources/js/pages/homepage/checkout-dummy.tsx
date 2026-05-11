import { Order } from '@/types';
import axios from 'axios';

type PayProps = {
    order: Order;
};

export default function Checkout({ order }: PayProps) {
    const pay = async () => {
        try {
            console.log(1);
            const response = await axios.post(`/api/orders/${order.id}/pay`);
            console.log(1);
            console.log('response', response);

            window.snap.pay(response.data.snap_token, {
                onSuccess: (result) => {
                    console.log(result);
                    alert('Pembayaran berhasil, menunggu konfirmasi');
                },
                onPending: (result) => {
                    console.log(result);
                    alert('Menunggu pembayaran');
                },
                onError: (result) => {
                    console.log(result);
                    alert('Pembayaran gagal');
                },
            });
            console.log(1);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div onClick={pay} className="">
            Checkout
        </div>
    );
}
