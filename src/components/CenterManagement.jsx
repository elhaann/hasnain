import React, { useState } from "react";
import dummyData from "../assets/data/dummyData.json";
import styles from "./CenterManagement.module.css";

const CenterManagement = () => {
  const [centers, setCenters] = useState(dummyData.collectionCenters);
  const [showForm, setShowForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
    capacity: "",
    currentLoad: "",
    status: "active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const centerData = {
      name: formData.name,
      address: formData.address,
      lat: Number.parseFloat(formData.lat),
      lng: Number.parseFloat(formData.lng),
      capacity: Number.parseInt(formData.capacity),
      currentLoad: Number.parseInt(formData.currentLoad),
      status: formData.status,
    };

    if (editingCenter) {
      // Update existing center
      setCenters(centers.map((center) => (center.id === editingCenter.id ? { ...center, ...centerData } : center)));
      setEditingCenter(null);
    } else {
      // Add new center
      const newCenter = {
        id: Date.now(),
        ...centerData,
      };
      setCenters([newCenter, ...centers]);
    }

    // Reset form
    setFormData({
      name: "",
      address: "",
      lat: "",
      lng: "",
      capacity: "",
      currentLoad: "",
      status: "active",
    });
    setShowForm(false);
  };

  const handleEdit = (center) => {
    setEditingCenter(center);
    setFormData({
      name: center.name,
      address: center.address,
      lat: center.lat.toString(),
      lng: center.lng.toString(),
      capacity: center.capacity.toString(),
      currentLoad: center.currentLoad.toString(),
      status: center.status,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this collection center?")) {
      setCenters(centers.filter((center) => center.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-chart-1/10 text-chart-1";
      case "maintenance":
        return "bg-chart-3/10 text-chart-3";
      case "inactive":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCapacityColor = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 70) return "text-chart-3";
    return "text-chart-1";
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Collection Centers</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCenter(null);
            setFormData({
              name: "",
              address: "",
              lat: "",
              lng: "",
              capacity: "",
              currentLoad: "",
              status: "active",
            });
          }}
          className={styles.addButton}
        >
          Add New Center
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>{editingCenter ? "Edit Collection Center" : "Add New Collection Center"}</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Center Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              <label className={styles.formLabel}>Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Capacity (kg)</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Current Load (kg)</label>
              <input
                type="number"
                value={formData.currentLoad}
                onChange={(e) => setFormData({ ...formData, currentLoad: e.target.value })}
                className={styles.formInput}
                required
              />
            </div>

            <div className={`${styles.formField} ${styles.formFullWidth}`}>
              <label className={styles.formLabel}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={styles.formInput}
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className={`${styles.formField} ${styles.formFullWidth} ${styles.formButtonGroup}`}>
              <button type="submit" className={styles.formSubmitButton}>
                {editingCenter ? "Update Center" : "Add Center"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCenter(null);
                }}
                className={styles.formCancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Centers Grid */}
      <div className={styles.centersGrid}>
        {centers.map((center) => (
          <div key={center.id} className={styles.centerCard}>
            <div className={styles.centerHeader}>
              <div>
                <h3 className={styles.centerName}>{center.name}</h3>
                <p className={styles.centerAddress}>{center.address}</p>
              </div>
              <span className={`${styles.centerStatus} ${getStatusColor(center.status)}`}>
                {center.status.toUpperCase()}
              </span>
            </div>

            <div className={styles.centerDetails}>
              <div className={styles.centerDetail}>
                <span className={styles.centerDetailLabel}>Capacity:</span>
                <span className={styles.centerDetailValue}>{center.capacity}kg</span>
              </div>
              <div className={styles.centerDetail}>
                <span className={styles.centerDetailLabel}>Current Load:</span>
                <span
                  className={`${styles.centerDetailValue} ${getCapacityColor(center.currentLoad, center.capacity)}`}
                >
                  {center.currentLoad}kg ({Math.round((center.currentLoad / center.capacity) * 100)}%)
                </span>
              </div>
              <div className={styles.centerProgressBar}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${Math.min((center.currentLoad / center.capacity) * 100, 100)}%` }}
                />
              </div>
              <div className={styles.centerLocation}>
                Location: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
              </div>
            </div>

            <div className={styles.centerActions}>
              <button onClick={() => handleEdit(center)} className={styles.centerEditButton}>
                Edit
              </button>
              <button onClick={() => handleDelete(center.id)} className={styles.centerDeleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterManagement;


