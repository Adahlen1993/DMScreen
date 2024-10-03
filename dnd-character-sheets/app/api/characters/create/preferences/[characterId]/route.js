import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch character preferences
export async function GET(req, { params }) {
  const { characterId } = params;

  try {
    const result = await query(
      `SELECT cp.* 
       FROM character_preferences cp
       JOIN characters c ON c.preferences_id = cp.id
       WHERE c.id = $1`, 
      [characterId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Character preferences not found' }, { status: 404 });
    }

    const preferences = result.rows[0];
    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error fetching character preferences:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create new preferences
export async function POST(req) {
  const body = await req.json();
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
    characterPrivacy,
    characterId  // Ensure this is passed correctly from the frontend
  } = body;

  try {
    // Insert new preferences
    const preferencesResult = await query(
      `INSERT INTO character_preferences 
        (character_name, avatar_url, allow_sources, homebrew, expanded_rules, legacy_rules, critical_role, drakkenheim, humblewood, grim_hollow, kobold_press, mcdm, minecraft, rick_and_morty, dice_rolling, optional_class_features, customize_your_origin, advancement_type, hit_point_type, feats_prerequisites, multiclass_prerequisites, show_level_scaled_spells, encumbrance_type, ignore_coin_weight, character_privacy)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
      RETURNING id`,
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
        characterPrivacy,
      ]
    );

    const newPreferenceId = preferencesResult.rows[0].id;

    // Check if `characterId` is correctly passed
    if (!characterId) {
      throw new Error('Character ID is missing');
    }

    // Link preferences to character
    await query(
      `UPDATE characters SET preferences_id = $1 WHERE id = $2`,
      [newPreferenceId, characterId]
    );

    return NextResponse.json({ preferenceId: newPreferenceId }, { status: 201 });
  } catch (error) {
    console.error('Error saving character preferences:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update existing preferences
export async function PUT(req) {
    const body = await req.json();
  
    const {
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
      characterPrivacy,
    } = body;
  
    try {
      // First, fetch the current preferences
      const preferencesResult = await query(
        `SELECT * FROM character_preferences WHERE id = (
          SELECT preferences_id FROM characters WHERE id = $1
        )`,
        [characterId]
      );
  
      if (preferencesResult.rows.length === 0) {
        return NextResponse.json({ error: 'Preferences not found for this character' }, { status: 404 });
      }
  
      const currentPreferences = preferencesResult.rows[0];
      const preferencesId = currentPreferences.id;
  
      // Build the updated preferences, keeping current values if no new ones are provided
      const updatedPreferences = {
        characterName: characterName || currentPreferences.character_name,
        avatarUrl: avatarUrl || currentPreferences.avatar_url,
        allowSources: allowSources !== undefined ? allowSources : currentPreferences.allow_sources,
        homebrew: homebrew !== undefined ? homebrew : currentPreferences.homebrew,
        expandedRules: expandedRules !== undefined ? expandedRules : currentPreferences.expanded_rules,
        legacyRules: legacyRules !== undefined ? legacyRules : currentPreferences.legacy_rules,
        criticalRole: criticalRole !== undefined ? criticalRole : currentPreferences.critical_role,
        drakkenheim: drakkenheim !== undefined ? drakkenheim : currentPreferences.drakkenheim,
        humblewood: humblewood !== undefined ? humblewood : currentPreferences.humblewood,
        grimHollow: grimHollow !== undefined ? grimHollow : currentPreferences.grim_hollow,
        koboldPress: koboldPress !== undefined ? koboldPress : currentPreferences.kobold_press,
        mcdm: mcdm !== undefined ? mcdm : currentPreferences.mcdm,
        minecraft: minecraft !== undefined ? minecraft : currentPreferences.minecraft,
        rickAndMorty: rickAndMorty !== undefined ? rickAndMorty : currentPreferences.rick_and_morty,
        diceRolling: diceRolling !== undefined ? diceRolling : currentPreferences.dice_rolling,
        optionalClassFeatures: optionalClassFeatures !== undefined ? optionalClassFeatures : currentPreferences.optional_class_features,
        customizeYourOrigin: customizeYourOrigin !== undefined ? customizeYourOrigin : currentPreferences.customize_your_origin,
        advancementType: advancementType || currentPreferences.advancement_type,
        hitPointType: hitPointType || currentPreferences.hit_point_type,
        featsPrerequisites: featsPrerequisites !== undefined ? featsPrerequisites : currentPreferences.feats_prerequisites,
        multiclassPrerequisites: multiclassPrerequisites !== undefined ? multiclassPrerequisites : currentPreferences.multiclass_prerequisites,
        showLevelScaledSpells: showLevelScaledSpells !== undefined ? showLevelScaledSpells : currentPreferences.show_level_scaled_spells,
        encumbranceType: encumbranceType || currentPreferences.encumbrance_type,
        ignoreCoinWeight: ignoreCoinWeight !== undefined ? ignoreCoinWeight : currentPreferences.ignore_coin_weight,
        characterPrivacy: characterPrivacy || currentPreferences.character_privacy,
      };
  
      // Update the preferences in the database
      const result = await query(
        `UPDATE character_preferences SET 
          character_name = $1, avatar_url = $2, allow_sources = $3, homebrew = $4, expanded_rules = $5, legacy_rules = $6,
          critical_role = $7, drakkenheim = $8, humblewood = $9, grim_hollow = $10, kobold_press = $11, mcdm = $12, minecraft = $13, 
          rick_and_morty = $14, dice_rolling = $15, optional_class_features = $16, customize_your_origin = $17, advancement_type = $18, 
          hit_point_type = $19, feats_prerequisites = $20, multiclass_prerequisites = $21, show_level_scaled_spells = $22, encumbrance_type = $23, 
          ignore_coin_weight = $24, character_privacy = $25 WHERE id = $26`,
        [
          updatedPreferences.characterName,
          updatedPreferences.avatarUrl,
          updatedPreferences.allowSources,
          updatedPreferences.homebrew,
          updatedPreferences.expandedRules,
          updatedPreferences.legacyRules,
          updatedPreferences.criticalRole,
          updatedPreferences.drakkenheim,
          updatedPreferences.humblewood,
          updatedPreferences.grimHollow,
          updatedPreferences.koboldPress,
          updatedPreferences.mcdm,
          updatedPreferences.minecraft,
          updatedPreferences.rickAndMorty,
          updatedPreferences.diceRolling,
          updatedPreferences.optionalClassFeatures,
          updatedPreferences.customizeYourOrigin,
          updatedPreferences.advancementType,
          updatedPreferences.hitPointType,
          updatedPreferences.featsPrerequisites,
          updatedPreferences.multiclassPrerequisites,
          updatedPreferences.showLevelScaledSpells,
          updatedPreferences.encumbranceType,
          updatedPreferences.ignoreCoinWeight,
          updatedPreferences.characterPrivacy,
          preferencesId,
        ]
      );
  
      if (result.rowCount === 0) {
        return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
      }
  
      return NextResponse.json({ message: 'Preferences updated successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error updating character preferences:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  