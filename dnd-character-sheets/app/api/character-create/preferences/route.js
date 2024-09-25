import { query } from '../../../lib/db';

export async function POST(req) {
  const {
    characterName, avatarUrl, homebrew, diceRolling, optionalClassFeatures, customizeOrigin,
    advancementType, hitPointType, prerequisitesFeats, prerequisitesMulticlass,
    showLevelScaledSpells, encumbranceType, ignoreCoinWeight, characterPrivacy
  } = await req.json();

  try {
    const result = await query(
      `INSERT INTO character_preferences 
        (character_name, avatar_url, sources_homebrew, dice_rolling, optional_class_features, customize_origin,
         advancement_type, hit_point_type, prerequisites_feats, prerequisites_multiclass,
         show_level_scaled_spells, encumbrance_type, ignore_coin_weight, character_privacy)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING id, character_name`,
      [
        characterName, avatarUrl, homebrew, diceRolling, optionalClassFeatures, customizeOrigin,
        advancementType, hitPointType, prerequisitesFeats, prerequisitesMulticlass,
        showLevelScaledSpells, encumbranceType, ignoreCoinWeight, characterPrivacy
      ]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
