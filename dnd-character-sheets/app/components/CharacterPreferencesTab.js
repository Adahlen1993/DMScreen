// components/CharacterPreferencesTab.js

export default function CharacterPreferencesTab() {
    return (
      <div>
        <h2>Character Preferences</h2>
        {/* Homebrew Toggle */}
        <label>
          <input type="checkbox" name="homebrew" />
          Allow Homebrew
        </label>
  
        {/* Advancement Type */}
        <div>
          <h3>Advancement Type</h3>
          <label>
            <input type="radio" name="advancementType" value="XP" />
            XP
          </label>
          <label>
            <input type="radio" name="advancementType" value="Milestone" />
            Milestone
          </label>
        </div>
  
        {/* Hit Point Type */}
        <div>
          <h3>Hit Point Type</h3>
          <label>
            <input type="radio" name="hitPointType" value="Fixed" />
            Fixed
          </label>
          <label>
            <input type="radio" name="hitPointType" value="Roll" />
            Roll
          </label>
        </div>
  
        {/* Character Privacy */}
        <div>
          <h3>Character Privacy</h3>
          <label>
            <input type="radio" name="privacy" value="Private" />
            Private
          </label>
          <label>
            <input type="radio" name="privacy" value="Public" />
            Public
          </label>
        </div>
      </div>
    );
  }
  