import { OrderConfirmation } from '@/Components/Ui/checkout/order-confirmation';

interface PageProps {
  params: {
    orderId: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: `Order ${params.orderId}`,
    description: 'Your order confirmation',
  };
}

export default function Page({ params }: PageProps) {
  return <OrderConfirmation orderId={params.orderId} />;
}
