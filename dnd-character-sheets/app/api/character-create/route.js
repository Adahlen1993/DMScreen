// pages/api/save-character-preferences.js
import { query } from '../../lib/db';  // Assuming you have a db connection set up

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      characterName, avatarUrl, homebrew, diceRolling, optionalClassFeatures, customizeOrigin,
      advancementType, hitPointType, prerequisitesFeats, prerequisitesMulticlass,
      showLevelScaledSpells, encumbranceType, ignoreCoinWeight, characterPrivacy
    } = req.body;

    try {
      const result = await query(
        `INSERT INTO character_preferences 
        (character_name, avatar_url, sources_homebrew, dice_rolling, optional_class_features, customize_origin,
         advancement_type, hit_point_type, prerequisites_feats, prerequisites_multiclass,
         show_level_scaled_spells, encumbrance_type, ignore_coin_weight, character_privacy)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          characterName, avatarUrl, homebrew, diceRolling, optionalClassFeatures, customizeOrigin,
          advancementType, hitPointType, prerequisitesFeats, prerequisitesMulticlass,
          showLevelScaledSpells, encumbranceType, ignoreCoinWeight, characterPrivacy
        ]
      );

      res.status(200).json({ success: true, message: 'Character preferences saved successfully!' });
    } catch (error) {
      console.error('Error saving character preferences:', error);
      res.status(500).json({ success: false, message: 'Error saving preferences' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
