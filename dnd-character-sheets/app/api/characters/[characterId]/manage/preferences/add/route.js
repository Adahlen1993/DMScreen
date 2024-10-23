import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add preferences to the character_preferences table
export async function POST(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters
  const {
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
    characterPrivacy
  } = await req.json(); // Get preferences from the request body

  if (!characterId || !characterName) {
    return NextResponse.json({ error: 'Character ID and Character Name are required' }, { status: 400 });
  }

  try {
    // Insert preferences into the character_preferences table
    const insertResult = await query(
      `INSERT INTO character_preferences (
        character_name,
        avatar_url,
        allow_sources,
        homebrew,
        expanded_rules,
        legacy_rules,
        critical_role,
        drakkenheim,
        humblewood,
        grim_hollow,
        kobold_press,
        mcdm,
        minecraft,
        rick_and_morty,
        dice_rolling,
        optional_class_features,
        customize_your_origin,
        advancement_type,
        hit_point_type,
        feats_prerequisites,
        multiclass_prerequisites,
        show_level_scaled_spells,
        encumbrance_type,
        ignore_coin_weight,
        character_privacy
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING id`,
      [
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
        characterPrivacy
      ]
    );

    if (insertResult.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to add character preferences' }, { status: 500 });
    }

    const characterPreferencesId = insertResult.rows[0].id;

    // Update the characters table to link to the new character_preferences_id
    const updateResult = await query(
      `UPDATE characters
       SET preferences_id = $1
       WHERE id = $2
       RETURNING *`,
      [characterPreferencesId, characterId]
    );

    if (updateResult.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to link character preferences to character' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Character preferences added and linked successfully', character: updateResult.rows[0] });
  } catch (error) {
    console.error('Error adding character preferences:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
