import React, { useState } from "react";
import styles from "./PickupManagement.module.css";

const PickupManagement = () => {
  const [pickups, setPickups] = useState([
    {
      id: 1,
      citizenName: "John Doe",
      address: "123 Green Street, Eco City",
      wasteType: "Mixed Waste",
      amount: "15kg",
      status: "pending",
      notes: "Large amount of organic waste",
    },
    {
      id: 2,
      citizenName: "Sarah Johnson",
      address: "456 Recycle Ave, Green Valley",
      wasteType: "Plastic Only",
      amount: "50 items",
      status: "scheduled",
      scheduledDate: "2024-03-20",
      notes: "Mostly bottles and containers",
    },
    {
      id: 3,
      citizenName: "Mike Chen",
      address: "789 Eco Boulevard, Riverside",
      wasteType: "Organic Waste",
      amount: "8kg",
      status: "completed",
      scheduledDate: "2024-03-18",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPickup, setEditingPickup] = useState(null);
  const [formData, setFormData] = useState({
    citizenName: "",
    address: "",
    wasteType: "",
    amount: "",
    status: "pending",
    scheduledDate: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingPickup) {
      // Update existing pickup
      setPickups(pickups.map((pickup) => (pickup.id === editingPickup.id ? { ...pickup, ...formData } : pickup)));
      setEditingPickup(null);
    } else {
      // Add new pickup
      const newPickup = {
        id: Date.now(),
        ...formData,
      };
      setPickups([newPickup, ...pickups]);
    }

    // Reset form
    setFormData({
      citizenName: "",
      address: "",
      wasteType: "",
      amount: "",
      status: "pending",
      scheduledDate: "",
      notes: "",
    });
    setShowForm(false);
  };

  const handleEdit = (pickup) => {
    setEditingPickup(pickup);
    setFormData({
      citizenName: pickup.citizenName,
      address: pickup.address,
      wasteType: pickup.wasteType,
      amount: pickup.amount,
      status: pickup.status,
      scheduledDate: pickup.scheduledDate || "",
      notes: pickup.notes || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pickup?")) {
      setPickups(pickups.filter((pickup) => pickup.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "scheduled":
        return styles.statusScheduled;
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Pickup Management</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingPickup(null);
            setFormData({
              citizenName: "",
              address: "",
              wasteType: "",
              amount: "",
              status: "pending",
              scheduledDate: "",
              notes: "",
            });
          }}
          className={styles.addButton}
        >
          Schedule New Pickup
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>{editingPickup ? "Edit Pickup" : "Schedule New Pickup"}</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Citizen Name</label>
              <input
                type="text"
                value={formData.citizenName}
                onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Waste Type</label>
              <select
                value={formData.wasteType}
                onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                className={styles.formInput}
                required
              >
                <option value="">Select waste type</option>
                <option value="Mixed Waste">Mixed Waste</option>
                <option value="Organic Waste">Organic Waste</option>
                <option value="Plastic Only">Plastic Only</option>
                <option value="Bulk Items">Bulk Items</option>
              </select>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Amount</label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={styles.formInput}
                placeholder="e.g., 10kg or 25 items"
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={styles.formInput}
              >
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Scheduled Date</label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={styles.formInput}
                rows={3}
                placeholder="Additional notes..."
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                {editingPickup ? "Update Pickup" : "Schedule Pickup"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPickup(null);
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pickups Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableCell}>Citizen</th>
                <th className={styles.tableCell}>Address</th>
                <th className={styles.tableCell}>Waste Type</th>
                <th className={styles.tableCell}>Amount</th>
                <th className={styles.tableCell}>Status</th>
                <th className={styles.tableCell}>Scheduled</th>
                <th className={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup) => (
                <tr key={pickup.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{pickup.citizenName}</td>
                  <td className={styles.tableCell}>{pickup.address}</td>
                  <td className={styles.tableCell}>{pickup.wasteType}</td>
                  <td className={styles.tableCell}>{pickup.amount}</td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${getStatusColor(pickup.status)}`}>
                      {pickup.status.toUpperCase()}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    {pickup.scheduledDate ? new Date(pickup.scheduledDate).toLocaleDateString() : "-"}
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleEdit(pickup)} className={styles.editButton}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(pickup.id)} className={styles.deleteButton}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PickupManagement;
