import { getDictionary } from '@/content';
import type { Locale } from '@/lib/i18n';
import { LeadFormView } from './lead-form-view';

/**
 * Сервер бөлігі: сөздіктен тек форманың жолдарын алып береді.
 * Үш тілдің сөздігін клиенттік бандлға жіберудің қажеті жоқ.
 */
export function LeadForm({
  lang,
  defaultProjectType = 'UNKNOWN',
  compact = false,
}: {
  lang: Locale;
  defaultProjectType?: string;
  compact?: boolean;
}) {
  return (
    <LeadFormView
      labels={getDictionary(lang).forms}
      defaultProjectType={defaultProjectType}
      compact={compact}
    />
  );
}
