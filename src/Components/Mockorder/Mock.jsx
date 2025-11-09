import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock orders data
  const mockOrders = [
    {
      _id: "order123",
      status: "Pending",
      paymentMethod: "Mpesa",
      totalAmount: 4500,
      items: [
        {
          productId: "prod1",
          name: "Gold Ring",
          quantity: 1,
          price: 2000,
          image:
            "https://images.unsplash.com/photo-1600185364400-14d6db7f6aa6?fit=crop&w=80&h=80",
        },
        {
          productId: "prod2",
          name: "Necklace",
          quantity: 2,
          price: 1250,
          image:
            "https://images.unsplash.com/photo-1598300051211-9b3f19bfc6a1?fit=crop&w=80&h=80",
        },
      ],
    },
    {
      _id: "order456",
      status: "Delivered",
      paymentMethod: "Credit Card",
      totalAmount: 3200,
      items: [
        {
          productId: "prod3",
          name: "Bracelet",
          quantity: 1,
          price: 3200,
          image:
            "https://images.unsplash.com/photo-1598300051211-9b3f19bfc6a1?fit=crop&w=80&h=80",
        },
      ],
    },
  ];

  // Fetch orders (mock)
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Simulate network delay
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  // Mock handleStatusChange
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading your orders...</p>;
  if (!orders || orders.length === 0)
    return <p className="no-orders-text">You have no orders yet.</p>;

  const allowedStatuses = [
    "Pending",
    "Paid",
    "Packaged",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <span
              className={`order-status ${
                order.status?.toLowerCase().replace(/ /g, "-") || "pending"
              }`}
            >
              {order.status || "Pending"}
            </span>
          </div>

          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Total:</strong> KES {order.totalAmount}
          </p>

          <div className="order-items">
            <h4>Items:</h4>
            <div className="items-grid">
              {order.items.map((item) => (
                <div key={item.productId} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                  <p className="item-price">KES {item.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="status-update">
            <label htmlFor={`status-${order._id}`}>Update Status:</label>
            <select
              id={`status-${order._id}`}
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              {allowedStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
