# File and Folder Naming Conventions

## General Rule

Use **kebab-case** for all files and folders.

## File Naming

### Components

- Use kebab-case for component files
- Prefix with descriptive names
- Examples:
  - ✅ `user-profile.tsx`
  - ✅ `navigation-header.tsx`
  - ✅ `search-bar.tsx`
  - ❌ `UserProfile.tsx`
  - ❌ `navigationHeader.tsx`

### Services

- Use kebab-case for service files
- Include `-service` suffix when appropriate
- Examples:
  - ✅ `auth-service.ts`
  - ✅ `api-client.ts`
  - ✅ `user-service.ts`
  - ❌ `AuthService.ts`
  - ❌ `apiClient.ts`

### Utilities

- Use kebab-case for utility files
- Group in appropriate directories
- Examples:
  - ✅ `format-utils.ts`
  - ✅ `validation-helpers.ts`
  - ✅ `date-functions.ts`
  - ❌ `formatUtils.ts`
  - ❌ `ValidationHelpers.ts`

### Constants

- Use kebab-case or UPPER_SNAKE_CASE
- Choose one style and be consistent
- Examples:
  - ✅ `api-endpoints.ts`
  - ✅ `theme-constants.ts`
  - ❌ `API_ENDPOINTS.ts`
  - ❌ `THEME_CONSTANTS.ts`
  - ❌ `apiEndpoints.ts`
  - ❌ `ApiEndpoints.ts`

## Folder Naming

### Feature Folders

- Use kebab-case for feature directories
- Examples:
  - ✅ `user-management/`
  - ✅ `dashboard-widgets/`
  - ✅ `search-components/`
  - ❌ `UserManagement/`
  - ❌ `searchComponents/`

### Shared Directories

- Use kebab-case for shared folders
- Examples:
  - ✅ `components/`
  - ✅ `utils/`
  - ✅ `services/`
  - ✅ `hooks/`
  - ✅ `types/`

## Test Files

- Follow the same naming convention as the source file
- Add `.test` or `.spec` suffix
- Examples:
  - ✅ `user-profile.test.tsx`
  - ✅ `auth-service.test.ts`
  - ✅ `format-utils.test.ts`
  - ❌ `UserProfile.test.tsx`
  - ❌ `authService.test.ts`

## Best Practices

1. **Be descriptive**: Use clear, meaningful names
2. **Stay consistent**: Follow the same pattern throughout the project
3. **Keep it simple**: Avoid overly complex names
4. **Think about organization**: Group related files logically
