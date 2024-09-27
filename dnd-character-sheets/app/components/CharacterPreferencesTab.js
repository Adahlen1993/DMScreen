import { useState, useEffect } from "react";

export default function CharacterPreferencesTab() {
  // Form state
  const [characterName, setCharacterName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [homebrew, setHomebrew] = useState(false);
  const [diceRolling, setDiceRolling] = useState(false);
  const [optionalClassFeatures, setOptionalClassFeatures] = useState(false);
  const [customizeOrigin, setCustomizeOrigin] = useState(false);
  const [advancementType, setAdvancementType] = useState("XP");
  const [hitPointType, setHitPointType] = useState("Fixed");
  const [prerequisitesFeats, setPrerequisitesFeats] = useState(true);
  const [prerequisitesMulticlass, setPrerequisitesMulticlass] = useState(true);
  const [showLevelScaledSpells, setShowLevelScaledSpells] = useState(false);
  const [encumbranceType, setEncumbranceType] = useState("Standard");
  const [ignoreCoinWeight, setIgnoreCoinWeight] = useState(false);
  const [characterPrivacy, setCharacterPrivacy] = useState("Private");

  // Button state
  const [isSaved, setIsSaved] = useState(false);

  // Function to check if form has changed after save
  useEffect(() => {
    setIsSaved(false); // Reset save status whenever any field changes
  }, [
    characterName,
    avatarUrl,
    homebrew,
    diceRolling,
    optionalClassFeatures,
    customizeOrigin,
    advancementType,
    hitPointType,
    prerequisitesFeats,
    prerequisitesMulticlass,
    showLevelScaledSpells,
    encumbranceType,
    ignoreCoinWeight,
    characterPrivacy,
  ]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    const preferences = {
      characterName,
      avatarUrl,
      homebrew,
      diceRolling,
      optionalClassFeatures,
      customizeOrigin,
      advancementType,
      hitPointType,
      prerequisitesFeats,
      prerequisitesMulticlass,
      showLevelScaledSpells,
      encumbranceType,
      ignoreCoinWeight,
      characterPrivacy,
    };

    // Call the API to save the preferences
    const response = await fetch("/api/character-create/preferences", {
      // Correct route
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Preferences saved successfully", data);
      setIsSaved(true); // Disable button when saved
    } else {
      const errorData = await response.json();
      console.error("Error saving preferences:", errorData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Character Preferences</h2>
      {/* Form fields */}
      <div>
        <label>
          Character Name:
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Enter your character's name"
          />
        </label>
      </div>

      <div>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Enter URL for character avatar"
          />
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={homebrew}
            onChange={(e) => setHomebrew(e.target.checked)}
          />
          Allow Homebrew Sources
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={diceRolling}
            onChange={(e) => setDiceRolling(e.target.checked)}
          />
          Enable Digital Dice Rolling
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={optionalClassFeatures}
            onChange={(e) => setOptionalClassFeatures(e.target.checked)}
          />
          Use Optional Class Features
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={customizeOrigin}
            onChange={(e) => setCustomizeOrigin(e.target.checked)}
          />
          Customize Origin
        </label>
      </div>

      <div>
        <h3>Advancement Type</h3>
        <label>
          <input
            type="radio"
            name="advancementType"
            value="XP"
            checked={advancementType === "XP"}
            onChange={() => setAdvancementType("XP")}
          />
          XP
        </label>
        <label>
          <input
            type="radio"
            name="advancementType"
            value="Milestone"
            checked={advancementType === "Milestone"}
            onChange={() => setAdvancementType("Milestone")}
          />
          Milestone
        </label>
      </div>

      <div>
        <h3>Hit Point Type</h3>
        <label>
          <input
            type="radio"
            name="hitPointType"
            value="Fixed"
            checked={hitPointType === "Fixed"}
            onChange={() => setHitPointType("Fixed")}
          />
          Fixed
        </label>
        <label>
          <input
            type="radio"
            name="hitPointType"
            value="Roll"
            checked={hitPointType === "Roll"}
            onChange={() => setHitPointType("Roll")}
          />
          Roll
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={prerequisitesFeats}
            onChange={(e) => setPrerequisitesFeats(e.target.checked)}
          />
          Feats
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={prerequisitesMulticlass}
            onChange={(e) => setPrerequisitesMulticlass(e.target.checked)}
          />
          Multi-Class
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showLevelScaledSpells}
            onChange={(e) => setShowLevelScaledSpells(e.target.checked)}
          />
          Show Level Scaled Spells
        </label>
      </div>
      <div>
  <h3>Encumbrance Type</h3>
  <label>
    <input
      type="radio"
      name="encumbranceType"
      value="Standard"  // Correct value based on the database constraint
      checked={encumbranceType === "Standard"}
      onChange={() => setEncumbranceType("Standard")}
    />
    Standard Encumbrance
  </label>
  <label>
    <input
      type="radio"
      name="encumbranceType"
      value="Disabled"  // Correct value based on the database constraint
      checked={encumbranceType === "Disabled"}
      onChange={() => setEncumbranceType("Disabled")}
    />
    No Encumbrance
  </label>
  <label>
    <input
      type="radio"
      name="encumbranceType"
      value="Detailed"  // Correct value based on the database constraint
      checked={encumbranceType === "Detailed"}
      onChange={() => setEncumbranceType("Detailed")}
    />
    Variant (Detailed) Encumbrance
  </label>
</div>


      <div>
        <label>
          <input
            type="checkbox"
            checked={ignoreCoinWeight}
            onChange={(e) => setIgnoreCoinWeight(e.target.checked)}
          />
          Ignore Coin Weight
        </label>
      </div>
      <div>
        <h3>Character Privacy</h3>
        <label>
          <input
            type="radio"
            name="characterPrivacy"
            value="Private" // Use the correct case
            checked={characterPrivacy === "Private"}
            onChange={() => setCharacterPrivacy("Private")}
          />
          Private
        </label>
        <label>
          <input
            type="radio"
            name="characterPrivacy"
            value="Public" // Use the correct case
            checked={characterPrivacy === "Public"}
            onChange={() => setCharacterPrivacy("Public")}
          />
          Public
        </label>
      </div>

      <button type="submit" disabled={isSaved}>
        Save Preferences
      </button>
    </form>
  );
}
