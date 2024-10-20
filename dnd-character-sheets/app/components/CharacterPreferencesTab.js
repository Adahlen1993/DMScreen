import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect';
import {
  fetchCharacterPreferencesRequest,
  saveCharacterPreferencesRequest,
} from "../../src/redux/actions/characters/preferences/index";

const selectCharacterPreferencesState = (state) => state.characterPreferences;

const selectPreferences = createSelector(
  [selectCharacterPreferencesState],
  (characterPreferences) => characterPreferences?.preferences || {}
);

const selectLoading = createSelector(
  [selectCharacterPreferencesState],
  (characterPreferences) => characterPreferences?.loading || {}
);

const selectError = createSelector(
  [selectCharacterPreferencesState],
  (characterPreferences) => characterPreferences?.error || null
);

export default function CharacterPreferencesTab({ characterId }) {
  const dispatch = useDispatch();
  const preferences = useSelector(selectPreferences);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [isModified, setIsModified] = useState(false);

  // Initialize form fields from Redux store
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    // Fetch preferences only if they exist (i.e., preferences are not empty)
    if (!preferences || Object.keys(preferences).length === 0) {
      dispatch(fetchCharacterPreferencesRequest(characterId));
    }
  }, [dispatch, characterId]);

  useEffect(() => {
    // Update local form fields with fetched preferences from Redux store, if they exist
    if (preferences && Object.keys(preferences).length > 0) {
      setFormFields(preferences);
    }
  }, [preferences]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isModified) {
      dispatch(saveCharacterPreferencesRequest({ ...formFields, characterId }));
      setIsModified(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Character Preferences</h2>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <div>
        <label>
          Character Name:
          <input
            type="text"
            name="characterName"
            value={formFields.characterName || ""}
            onChange={handleChange}
            placeholder="Enter your character's name"
          />
        </label>
      </div>

      <div>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatarUrl"
            value={formFields.avatarUrl || ""}
            onChange={handleChange}
            placeholder="Enter URL for character avatar"
          />
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="allowSources"
            checked={formFields.allowSources || false}
            onChange={handleChange}
          />
          Allow Sources
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="homebrew"
            checked={formFields.homebrew || false}
            onChange={handleChange}
          />
          Allow Homebrew Sources
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="expandedRules"
            checked={formFields.expandedRules || false}
            onChange={handleChange}
          />
          Use Expanded Rules
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="legacyRules"
            checked={formFields.legacyRules || false}
            onChange={handleChange}
          />
          Use Legacy 2014 Rules
        </label>
      </div>

      <div>
        <h3>Partnered Content</h3>
        <label>
          <input
            type="checkbox"
            name="criticalRole"
            checked={formFields.criticalRole || false}
            onChange={handleChange}
          />
          Critical Role
        </label>
        <label>
          <input
            type="checkbox"
            name="drakkenheim"
            checked={formFields.drakkenheim || false}
            onChange={handleChange}
          />
          Drakkenheim
        </label>
        <label>
          <input
            type="checkbox"
            name="humblewood"
            checked={formFields.humblewood || false}
            onChange={handleChange}
          />
          Humblewood
        </label>
        <label>
          <input
            type="checkbox"
            name="grimHollow"
            checked={formFields.grimHollow || false}
            onChange={handleChange}
          />
          Grim Hollow
        </label>
        <label>
          <input
            type="checkbox"
            name="koboldPress"
            checked={formFields.koboldPress || false}
            onChange={handleChange}
          />
          Kobold Press
        </label>
        <label>
          <input
            type="checkbox"
            name="mcdm"
            checked={formFields.mcdm || false}
            onChange={handleChange}
          />
          MCDM
        </label>
        <label>
          <input
            type="checkbox"
            name="minecraft"
            checked={formFields.minecraft || false}
            onChange={handleChange}
          />
          Minecraft
        </label>
        <label>
          <input
            type="checkbox"
            name="rickAndMorty"
            checked={formFields.rickAndMorty || false}
            onChange={handleChange}
          />
          Rick and Morty
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="diceRolling"
            checked={formFields.diceRolling || false}
            onChange={handleChange}
          />
          Enable Digital Dice Rolling
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="optionalClassFeatures"
            checked={formFields.optionalClassFeatures || false}
            onChange={handleChange}
          />
          Use Optional Class Features
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="customizeYourOrigin"
            checked={formFields.customizeYourOrigin || false}
            onChange={handleChange}
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
            checked={formFields.advancementType === "Milestone"}
            onChange={handleChange}
          />
          Milestone
        </label>
        <label>
          <input
            type="radio"
            name="advancementType"
            value="XP"
            checked={formFields.advancementType === "XP"}
            onChange={handleChange}
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
            checked={formFields.hitPointType === "Fixed"}
            onChange={handleChange}
          />
          Fixed
        </label>
        <label>
          <input
            type="radio"
            name="hitPointType"
            value="Manual"
            checked={formFields.hitPointType === "Manual"}
            onChange={handleChange}
          />
          Manual
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="featsPrerequisites"
            checked={formFields.featsPrerequisites || false}
            onChange={handleChange}
          />
          Feats Prerequisites
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="multiclassPrerequisites"
            checked={formFields.multiclassPrerequisites || false}
            onChange={handleChange}
          />
          Multiclass Prerequisites
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="showLevelScaledSpells"
            checked={formFields.showLevelScaledSpells || false}
            onChange={handleChange}
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
            checked={formFields.encumbranceType === "No Encumbrance"}
            onChange={handleChange}
          />
          No Encumbrance
        </label>
        <label>
          <input
            type="radio"
            name="encumbranceType"
            value="Use Encumbrance"
            checked={formFields.encumbranceType === "Use Encumbrance"}
            onChange={handleChange}
          />
          Use Encumbrance
        </label>
        <label>
          <input
            type="radio"
            name="encumbranceType"
            value="Variant Encumbrance"
            checked={formFields.encumbranceType === "Variant Encumbrance"}
            onChange={handleChange}
          />
          Variant Encumbrance
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="ignoreCoinWeight"
            checked={formFields.ignoreCoinWeight || false}
            onChange={handleChange}
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
            checked={formFields.characterPrivacy === "Campaign Only"}
            onChange={handleChange}
          />
          Campaign Only
        </label>
        <label>
          <input
            type="radio"
            name="characterPrivacy"
            value="Private"
            checked={formFields.characterPrivacy === "Private"}
            onChange={handleChange}
          />
          Private
        </label>
        <label>
          <input
            type="radio"
            name="characterPrivacy"
            value="Public"
            checked={formFields.characterPrivacy === "Public"}
            onChange={handleChange}
          />
          Public
        </label>
      </div>

      <button type="submit" disabled={!isModified || loading.save}>
        {loading.save ? "Saving..." : "Save Preferences"}
      </button>
    </form>
  );
}
