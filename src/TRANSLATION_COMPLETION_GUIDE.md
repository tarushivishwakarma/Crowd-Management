# Translation Completion Guide

## Completed Updates

### Core Translation System
✅ `/utils/translations.ts` - Expanded with comprehensive translations for all features in EN, HI, and GU

### Components with Translation Integration Started
✅ `DarshanBooking.tsx` - Added `t()` function and started replacing hardcoded text
✅ `MyBookings.tsx` - Added `t()` function  
✅ `Dashboard.tsx` - Already using translations
✅ `EmergencyButton.tsx` - Already using translations partially

## Components Needing Translation Integration

### Priority 1 - Pilgrim Components
1. `FacilitiesMap.tsx` - Needs `language` prop and translation keys for:
   - Map title and descriptions
   - Facility types (water, medical, transport, prasad, toilets)
   - Status labels (open, closed, clean, available)
   - Buttons and actions

2. `TransportAssistance.tsx` - Needs `language` prop and translation keys for:
   - Shuttle tracking labels
   - Parking information
   - Guidelines and instructions
   - Status messages

3. `pilgrim/CrowdAvoidance.tsx` - Needs `language` prop and translation keys for:
   - Time recommendations
   - Forecast labels
   - Seasonal trends
   - Festival alerts

4. `pilgrim/HistoricalIncidents.tsx` - Needs `language` prop and translation keys for:
   - Incident types
   - Severity levels
   - Filter options
   - Resolution text

5. `QRCodeDisplay.tsx` - Needs `language` prop and translation keys for:
   - Dialog title and description
   - Booking details labels
   - Action buttons
   - Instructions

### Priority 2 - Authority Components  
6. `authority/AlertsManagement.tsx`
7. `authority/CrowdHeatmap.tsx`
8. `authority/FootfallAnalytics.tsx`
9. `authority/ResourceManagement.tsx`
10. `authority/SmartMonitoring.tsx`

### Priority 3 - Supporting Components
11. `TempleInfo.tsx`
12. `DemoBanner.tsx`
13. `EventLog.tsx`

## Translation Integration Pattern

For each component:

1. Add import:
```typescript
import { Language, getTranslation } from '../utils/translations';
```

2. Add language prop to interface (if not already present):
```typescript
interface ComponentProps {
  // ... other props
  language?: Language;
}
```

3. Add translation function at component start:
```typescript
const Component: React.FC<ComponentProps> = ({ language = 'en', ...otherProps }) => {
  const t = (key: string) => getTranslation(language, key);
  // ...
}
```

4. Replace hardcoded text with translation calls:
```typescript
// Before:
<h1>Welcome</h1>

// After:
<h1>{t('dashboard.welcomeToTemples')}</h1>
```

5. Pass language prop to child components:
```typescript
<ChildComponent language={language} />
```

## Status Tracking

- [x] Translation keys defined for all features
- [ ] All pilgrim components updated
- [ ] All authority components updated
- [ ] All supporting components updated  
- [ ] End-to-end testing in all 3 languages
- [ ] Documentation updated

## Notes
- All translation keys follow the pattern: `category.subCategory.key`
- Fallback to English if translation not found
- Temple names and zone names have dedicated helper functions
- Status messages (low, moderate, high, critical) have their own translation category
