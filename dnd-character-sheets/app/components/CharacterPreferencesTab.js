import { useState, useEffect } from "react";

export default function CharacterPreferencesTab({ characterId }) {
  // Form state for all fields
  const [characterName, setCharacterName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [allowSources, setAllowSources] = useState(true); // Default is true
  const [homebrew, setHomebrew] = useState(false);
  const [expandedRules, setExpandedRules] = useState(false);
  const [legacyRules, setLegacyRules] = useState(false);

  // Partnered content toggles
  const [criticalRole, setCriticalRole] = useState(false);
  const [drakkenheim, setDrakkenheim] = useState(false);
  const [humblewood, setHumblewood] = useState(false);
  const [grimHollow, setGrimHollow] = useState(false);
  const [koboldPress, setKoboldPress] = useState(false);
  const [mcdm, setMcdm] = useState(false);
  const [minecraft, setMinecraft] = useState(false);
  const [rickAndMorty, setRickAndMorty] = useState(false);

  const [diceRolling, setDiceRolling] = useState(false);
  const [optionalClassFeatures, setOptionalClassFeatures] = useState(false);
  const [customizeYourOrigin, setCustomizeYourOrigin] = useState(false);
  const [advancementType, setAdvancementType] = useState("Milestone");
  const [hitPointType, setHitPointType] = useState("Fixed");
  const [featsPrerequisites, setFeatsPrerequisites] = useState(true);
  const [multiclassPrerequisites, setMulticlassPrerequisites] = useState(true);
  const [showLevelScaledSpells, setShowLevelScaledSpells] = useState(true);
  const [encumbranceType, setEncumbranceType] = useState("No Encumbrance");
  const [ignoreCoinWeight, setIgnoreCoinWeight] = useState(true);
  const [characterPrivacy, setCharacterPrivacy] = useState("Campaign Only");

  const [isSaved, setIsSaved] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // Detect changes in the form to enable the save button again
  useEffect(() => {
    if (isSaved) {
      setIsModified(true); // Mark the form as modified once a field changes
      setIsSaved(false);   // Re-enable the button
    }
  }, [
    characterName,
    avatarUrl,
    allowSources,
    homebrew,
    expandedRules,
    legacyRules,
    criticalRole,
    drakkenheim,
    humblewood,
    grimHollow,
    koboldPress,
    mcdm,
    minecraft,
    rickAndMorty,
    diceRolling,
    optionalClassFeatures,
    customizeYourOrigin,
    advancementType,
    hitPointType,
    featsPrerequisites,
    multiclassPrerequisites,
    showLevelScaledSpells,
    encumbranceType,
    ignoreCoinWeight,
    characterPrivacy,
  ]);

  // Fetch preferences from the API on mount
  useEffect(() => {
    const fetchPreferences = async () => {
      const res = await fetch(`/api/characters/create/preferences/${characterId}`);
      if (res.ok) {
        const data = await res.json();
        // Set state from fetched data
        setCharacterName(data.characterName || "");
        setAvatarUrl(data.avatarUrl || "");
        setAllowSources(data.allowSources);
        setHomebrew(data.homebrew);
        setExpandedRules(data.expandedRules);
        setLegacyRules(data.legacyRules);
        setCriticalRole(data.criticalRole);
        setDrakkenheim(data.drakkenheim);
        setHumblewood(data.humblewood);
        setGrimHollow(data.grimHollow);
        setKoboldPress(data.koboldPress);
        setMcdm(data.mcdm);
        setMinecraft(data.minecraft);
        setRickAndMorty(data.rickAndMorty);
        setDiceRolling(data.diceRolling);
        setOptionalClassFeatures(data.optionalClassFeatures);
        setCustomizeYourOrigin(data.customizeYourOrigin);
        setAdvancementType(data.advancementType);
        setHitPointType(data.hitPointType);
        setFeatsPrerequisites(data.featsPrerequisites);
        setMulticlassPrerequisites(data.multiclassPrerequisites);
        setShowLevelScaledSpells(data.showLevelScaledSpells);
        setEncumbranceType(data.encumbranceType);
        setIgnoreCoinWeight(data.ignoreCoinWeight);
        setCharacterPrivacy(data.characterPrivacy);
      }
    };

    fetchPreferences();
  }, [characterId]);

  // Save preferences function
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    const preferences = {
      characterName,
      avatarUrl,
      allowSources,
      homebrew,
      expandedRules,
      legacyRules,
      criticalRole,
      drakkenheim,
      humblewood,
      grimHollow,
      koboldPress,
      mcdm,
      minecraft,
      rickAndMorty,
      diceRolling,
      optionalClassFeatures,
      customizeYourOrigin,
      advancementType,
      hitPointType,
      featsPrerequisites,
      multiclassPrerequisites,
      showLevelScaledSpells,
      encumbranceType,
      ignoreCoinWeight,
      characterPrivacy,
      characterId,
    };

    // Call the API to save the preferences
    const response = await fetch(`/api/characters/create/preferences/${characterId}`, {
      method: isModified ? "PUT" : "POST", // Use PUT if it's an update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Preferences saved successfully", data);
      setIsSaved(true);   // Disable button after saving
      setIsModified(false); // Mark the form as not modified
    } else {
      const errorData = await response.json();
      console.error("Error saving preferences:", errorData);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Character Preferences</h2>

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
            checked={allowSources}
            onChange={(e) => setAllowSources(e.target.checked)}
          />
          Allow Sources
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
            checked={expandedRules}
            onChange={(e) => setExpandedRules(e.target.checked)}
          />
          Use Expanded Rules
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={legacyRules}
            onChange={(e) => setLegacyRules(e.target.checked)}
          />
          Use Legacy 2014 Rules
        </label>
      </div>

      <div>
        <h3>Partnered Content</h3>
        <label>
          <input
            type="checkbox"
            checked={criticalRole}
            onChange={(e) => setCriticalRole(e.target.checked)}
          />
          Critical Role
        </label>
        <label>
          <input
            type="checkbox"
            checked={drakkenheim}
            onChange={(e) => setDrakkenheim(e.target.checked)}
          />
          Drakkenheim
        </label>
        <label>
          <input
            type="checkbox"
            checked={humblewood}
            onChange={(e) => setHumblewood(e.target.checked)}
          />
          Humblewood
        </label>
        <label>
          <input
            type="checkbox"
            checked={grimHollow}
            onChange={(e) => setGrimHollow(e.target.checked)}
          />
          Grim Hollow
        </label>
        <label>
          <input
            type="checkbox"
            checked={koboldPress}
            onChange={(e) => setKoboldPress(e.target.checked)}
          />
          Kobold Press
        </label>
        <label>
          <input
            type="checkbox"
            checked={mcdm}
            onChange={(e) => setMcdm(e.target.checked)}
          />
          MCDM
        </label>
        <label>
          <input
            type="checkbox"
            checked={minecraft}
            onChange={(e) => setMinecraft(e.target.checked)}
          />
          Minecraft
        </label>
        <label>
          <input
            type="checkbox"
            checked={rickAndMorty}
            onChange={(e) => setRickAndMorty(e.target.checked)}
          />
          Rick and Morty
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
            checked={customizeYourOrigin}
            onChange={(e) => setCustomizeYourOrigin(e.target.checked)}
          />
          Customize Your Origin
        </label>
      </div>

      <div>
        <h3>Advancement Type</h3>
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
            value="Manual"
            checked={hitPointType === "Manual"}
            onChange={() => setHitPointType("Manual")}
          />
          Manual
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={featsPrerequisites}
            onChange={(e) => setFeatsPrerequisites(e.target.checked)}
          />
          Feats Prerequisites
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={multiclassPrerequisites}
            onChange={(e) => setMulticlassPrerequisites(e.target.checked)}
          />
          Multiclass Prerequisites
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={showLevelScaledSpells}
            onChange={(e) => setShowLevelScaledSpells(e.target.checked)}
          />
          Show Level-Scaled Spells
        </label>
      </div>

      <div>
        <h3>Encumbrance Type</h3>
        <label>
          <input
            type="radio"
            name="encumbranceType"
            value="No Encumbrance"
            checked={encumbranceType === "No Encumbrance"}
            onChange={() => setEncumbranceType("No Encumbrance")}
          />
          No Encumbrance
        </label>
        <label>
          <input
            type="radio"
            name="encumbranceType"
            value="Use Encumbrance"
            checked={encumbranceType === "Use Encumbrance"}
            onChange={() => setEncumbranceType("Use Encumbrance")}
          />
          Use Encumbrance
        </label>
        <label>
          <input
            type="radio"
            name="encumbranceType"
            value="Variant Encumbrance"
            checked={encumbranceType === "Variant Encumbrance"}
            onChange={() => setEncumbranceType("Variant Encumbrance")}
          />
          Variant Encumbrance
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
            value="Campaign Only"
            checked={characterPrivacy === "Campaign Only"}
            onChange={() => setCharacterPrivacy("Campaign Only")}
          />
          Campaign Only
        </label>
        <label>
          <input
            type="radio"
            name="characterPrivacy"
            value="Private"
            checked={characterPrivacy === "Private"}
            onChange={() => setCharacterPrivacy("Private")}
          />
          Private
        </label>
        <label>
          <input
            type="radio"
            name="characterPrivacy"
            value="Public"
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
