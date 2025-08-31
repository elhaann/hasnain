import React, { useState } from "react";
import styles from "./WasteEntryForm.module.css";


const WasteEntryForm = ({ onSubmit }) => {
  const [wetWaste, setWetWaste] = useState("");
  const [plasticWaste, setPlasticWaste] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const entry = {
      wetWaste: Number.parseFloat(wetWaste) || 0,
      plasticWaste: Number.parseInt(plasticWaste) || 0,
    };

    onSubmit(entry);

    // Reset form
    setWetWaste("");
    setPlasticWaste("");
    setIsSubmitting(false);

    // Show success message
    window.alert("Waste entry logged successfully! Eco-points added to your account.");
  };

  const estimatedPoints = (Number.parseFloat(wetWaste) || 0) * 4 + (Number.parseInt(plasticWaste) || 0) * 2;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label htmlFor="wetWaste" className={styles.label}>
          Wet Waste (kg)
        </label>
        <input
          type="number"
          id="wetWaste"
          value={wetWaste}
          onChange={(e) => setWetWaste(e.target.value)}
          step="0.1"
          min="0"
          className={styles.input}
          placeholder="e.g., 2.5"
          required
          disabled
        />
        <p className={styles.helpText}>Food scraps, organic waste, etc.</p>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="plasticWaste" className={styles.label}>
          Plastic Items (count)
        </label>
        <input
          type="number"
          id="plasticWaste"
          value={plasticWaste}
          onChange={(e) => setPlasticWaste(e.target.value)}
          min="0"
          className={styles.input}
          placeholder="e.g., 5"
          required
          disabled
        />
        <p className={styles.helpText}>Bottles, containers, packaging, etc.</p>
      </div>

      {(wetWaste || plasticWaste) && (
        <div className={styles.estimateCard}>
          <p>Estimated Eco-Points: {estimatedPoints}</p>
          <p>Wet waste: 4 points/kg • Plastic: 2 points/item</p>
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? "Logging Entry..." : "Log Waste Entry"}
      </button>
    </form>
  );
};

export default WasteEntryForm;
