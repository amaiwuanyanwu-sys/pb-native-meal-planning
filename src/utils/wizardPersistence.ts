import { WizardDraft } from '../types/wizard';

const DRAFT_KEY_PREFIX = 'wizard-draft-';
const DRAFT_VERSION = '1.0';

export const saveDraft = (
  planId: string,
  draft: Omit<WizardDraft, 'planId' | 'version' | 'lastModified'>
): void => {
  try {
    const draftData: WizardDraft = {
      ...draft,
      planId,
      version: DRAFT_VERSION,
      lastModified: new Date().toISOString(),
    };

    localStorage.setItem(
      `${DRAFT_KEY_PREFIX}${planId}`,
      JSON.stringify(draftData)
    );
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
};

export const loadDraft = (planId: string): WizardDraft | null => {
  try {
    const draftJson = localStorage.getItem(`${DRAFT_KEY_PREFIX}${planId}`);
    if (!draftJson) return null;

    const draft: WizardDraft = JSON.parse(draftJson);

    // Version check for future migrations
    if (draft.version !== DRAFT_VERSION) {
      console.warn('Draft version mismatch, may need migration');
    }

    return draft;
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
};

export const clearDraft = (planId: string): void => {
  try {
    localStorage.removeItem(`${DRAFT_KEY_PREFIX}${planId}`);
  } catch (error) {
    console.error('Failed to clear draft:', error);
  }
};

export const hasDraft = (planId: string): boolean => {
  return !!localStorage.getItem(`${DRAFT_KEY_PREFIX}${planId}`);
};
