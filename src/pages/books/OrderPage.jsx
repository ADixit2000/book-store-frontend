import React from "react";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersAPI";
import { useAuth } from "../../context/authContex";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useGetOrdersByEmailQuery(
    currentUser.email
  );
  const orders = data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error Getting Order Data</div>;
  }

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                {/* Order Number */}
                <div className="flex items-center justify-between mb-4">
                  <p className="p-1 px-3 bg-secondary text-white rounded-md font-semibold">
                    # {index + 1}
                  </p>
                  <p className="text-sm text-gray-500">
                    Order ID: <span className="font-semibold">{order._id}</span>
                  </p>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Customer Info</h3>
                    <p className="text-gray-600">Name: {order.name}</p>
                    <p className="text-gray-600">Email: {order.email}</p>
                    <p className="text-gray-600">Phone: {order.phone}</p>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="font-semibold mb-1">Payment Details</h3>
                    <p className="text-gray-700 text-lg font-bold">
                      Total: ${order.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-4">
                  <h3 className="font-semibold mb-1">Shipping Address</h3>
                  <p className="text-gray-600">
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country} - {order.address.zipcode}
                  </p>
                </div>

                {/* Product IDs */}
                <div className="mt-4">
                  <h3 className="font-semibold mb-1">Product IDs</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {order.productIds.map((productId, idx) => (
                      <li key={idx}>{productId}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;
