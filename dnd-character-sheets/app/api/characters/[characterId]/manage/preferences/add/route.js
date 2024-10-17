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
    const result = await query(
      `INSERT INTO character_preferences (
        character_id,
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) RETURNING *`,
      [
        characterId,
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

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to add character preferences' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Character preferences added successfully', preferences: result.rows[0] });
  } catch (error) {
    console.error('Error adding character preferences:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
