import { ThemeConfig } from '../types/commerce';

export const REGISTERED_THEMES: ThemeConfig[] = [
  {
    id: 'christmas-premium',
    name: 'Design 4 — Premium Hybrid Christmas',
    badge: 'ACTIVE HOLIDAY THEME',
    description: 'Classic American Christmas warmth combined with modern Shopify-grade polish, editorial typography, and subtle 3D depth.',
    primaryColor: '#073D2B', // Forest Green
    accentColor: '#B51225',  // Christmas Red
    backgroundTone: '#FAF7F0', // Warm Ivory
    isDefault: true,
  },
  {
    id: 'nordic-minimal',
    name: 'Nordic Winter Minimal',
    badge: 'PREVIEW READY',
    description: 'Clean Scandinavian aesthetic with cool winter silvers, soft eucalyptus tones, and restrained minimalism.',
    primaryColor: '#1E293B',
    accentColor: '#0284C7',
    backgroundTone: '#F8FAFC',
    isDefault: false,
  },
  {
    id: 'classic-storefront',
    name: 'AitoBazar Classic Commerce',
    badge: 'STANDARD THEME',
    description: 'Core year-round storefront layout with neutral slate palettes and standard conversion components.',
    primaryColor: '#0F172A',
    accentColor: '#4F46E5',
    backgroundTone: '#FFFFFF',
    isDefault: false,
  },
];

export function resolveTheme(themeId?: string): ThemeConfig {
  const found = REGISTERED_THEMES.find(t => t.id === themeId);
  return found || REGISTERED_THEMES[0];
}
