import React, { useState, useEffect } from "react";
import styles from "./WasteEntryForm.module.css";

const WasteEntryForm = ({ onSubmit, savedWasteData }) => {
  const [wetWaste, setWetWaste] = useState("");
  const [plasticWaste, setPlasticWaste] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasteType, setWasteType] = useState(""); // Track current waste type

  // Auto-populate form when saved waste data is available
  useEffect(() => {
    console.log('WasteEntryForm received savedWasteData:', savedWasteData);
    
    if (savedWasteData && savedWasteData.weight > 0) {
      const detectedWasteType = savedWasteData.wasteType.toLowerCase().trim();
      const weight = savedWasteData.weight;
      
      console.log('Processing waste type:', detectedWasteType);
      console.log('Weight to process:', weight);
      
      // Determine waste type and set fields accordingly
      if (detectedWasteType === 'wet' || 
          detectedWasteType.includes('wet') || 
          detectedWasteType.includes('organic') || 
          detectedWasteType.includes('food') ||
          detectedWasteType.includes('kitchen') ||
          detectedWasteType.includes('biodegradable')) {
        
        console.log('Setting WET waste to:', weight);
        setWasteType('wet');
        setWetWaste(weight.toString());
        setPlasticWaste("0");
        
      } else if (detectedWasteType === 'dry' || 
                 detectedWasteType.includes('dry') || 
                 detectedWasteType.includes('plastic') || 
                 detectedWasteType.includes('bottle') || 
                 detectedWasteType.includes('container') ||
                 detectedWasteType.includes('recyclable') ||
                 detectedWasteType.includes('paper') ||
                 detectedWasteType.includes('cardboard')) {
        
        console.log('Setting DRY waste to:', weight);
        setWasteType('dry');
        setPlasticWaste(weight.toString());
        setWetWaste("0");
        
      } else {
        console.log('Unknown waste type, defaulting to wet:', weight);
        setWasteType('wet');
        setWetWaste(weight.toString());
        setPlasticWaste("0");
      }
    } else {
      console.log('No saved data, allowing manual entry');
      setWasteType(""); // Allow manual selection
      setWetWaste("");
      setPlasticWaste("");
    }
  }, [savedWasteData]);

  // Handle manual waste type selection
  const handleWasteTypeChange = (selectedType) => {
    setWasteType(selectedType);
    if (selectedType === 'wet') {
      setPlasticWaste("0");
    } else if (selectedType === 'dry') {
      setWetWaste("0");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const wetWasteValue = Number.parseFloat(wetWaste) || 0;
    const plasticWasteValue = Number.parseFloat(plasticWaste) || 0;

    const entry = {
      wetWaste: wetWasteValue,
      plasticWaste: plasticWasteValue,
      wasteType: savedWasteData?.wasteType || (wasteType ? wasteType.charAt(0).toUpperCase() + wasteType.slice(1) : 'Manual Entry'),
      date: new Date().toISOString(),
      id: Date.now(),
      ecoPointsEarned: estimatedPoints
    };

    console.log('Submitting waste entry:', entry);
    onSubmit(entry);

    // Reset form
    setWetWaste("");
    setPlasticWaste("");
    setWasteType("");
    setIsSubmitting(false);

    // Show success message
    window.alert("Waste entry logged successfully! Eco-points added to your account.");
  };

  const estimatedPoints = (Number.parseFloat(wetWaste) || 0) * 4 + (Number.parseFloat(plasticWaste) || 0) * 2;

  const hasAutoData = savedWasteData && savedWasteData.weight > 0;
  const isWetWasteAutoFilled = hasAutoData && wasteType === 'wet';
  const isDryWasteAutoFilled = hasAutoData && wasteType === 'dry';

  return (
    <div>
      {/* Auto-filled data card - removed as per new requirements */}

      {/* Manual waste type selection - only show if no auto data */}
      {!hasAutoData && (
        <div className={styles.fieldGroup || 'field-group'} style={{ marginBottom: '20px' }}>
          <label className={styles.label || 'label'}>Select Waste Type:</label>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="wasteType"
                value="wet"
                checked={wasteType === 'wet'}
                onChange={(e) => handleWasteTypeChange(e.target.value)}
                style={{ marginRight: '5px' }}
              />
              Wet Waste
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="wasteType"
                value="dry"
                checked={wasteType === 'dry'}
                onChange={(e) => handleWasteTypeChange(e.target.value)}
                style={{ marginRight: '5px' }}
              />
              Dry Waste
            </label>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="wetWaste" className={styles.label}>
            Wet Waste (g) {isWetWasteAutoFilled && '🔄'}
          </label>
          <input
            type="number"
            id="wetWaste"
            value={wetWaste}
            onChange={(e) => setWetWaste(e.target.value)}
            step="0.1"
            min="0"
            className={styles.input}
            required
            disabled={wasteType === 'dry'} // Disable if dry waste is selected
            style={{
              backgroundColor: isWetWasteAutoFilled ? '#e8f5e8' : (wasteType === 'dry' ? '#f5f5f5' : 'white'),
              cursor: wasteType === 'dry' ? 'not-allowed' : 'text'
            }}
          />
          <p className={styles.helpText}>
            Food scraps, organic waste, etc.
            {wasteType === 'dry' && <span style={{color: '#999'}}> (Disabled - Dry waste selected)</span>}
          </p>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="plasticWaste" className={styles.label}>
            Dry Waste (g) {isDryWasteAutoFilled && '🔄'}
          </label>
          <input
            type="number"
            id="plasticWaste"
            value={plasticWaste}
            onChange={(e) => setPlasticWaste(e.target.value)}
            min="0"
            className={styles.input}
            required
            disabled={wasteType === 'wet'} // Disable if wet waste is selected
            style={{
              backgroundColor: isDryWasteAutoFilled ? '#e8f5e8' : (wasteType === 'wet' ? '#f5f5f5' : 'white'),
              cursor: wasteType === 'wet' ? 'not-allowed' : 'text'
            }}
          />
          <p className={styles.helpText}>
            Bottles, containers, packaging, etc.
            {wasteType === 'wet' && <span style={{color: '#999'}}> (Disabled - Wet waste selected)</span>}
          </p>
        </div>

        {(wetWaste || plasticWaste) && (
          <div className={styles.estimateCard}>
            <p>Estimated Eco-Points: {estimatedPoints}</p>
            <p>Wet waste: 4 points/kg • Dry waste: 2 points/kg</p>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || (!wasteType && !hasAutoData)} 
          className={styles.submitButton}
          style={{
            opacity: (!wasteType && !hasAutoData) ? 0.5 : 1,
            cursor: (!wasteType && !hasAutoData) ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? "Logging Entry..." : "Log Waste Entry"}
        </button>
        
        {!wasteType && !hasAutoData && (
          <p style={{fontSize: '12px', color: '#999', textAlign: 'center', marginTop: '5px'}}>
            Please select a waste type to continue
          </p>
        )}
      </form>
    </div>
  );
};

export default WasteEntryForm;