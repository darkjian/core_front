# Архитектура проекта

## Структура папок

```
app/                    # Next.js pages and layouts
components/             # React компоненты
hooks/
  ├── queries/         # TanStack Query hooks (читаем данные)
  │   ├── workouts.ts
  │   ├── programs.ts
  │   └── index.ts
  └── mutations/       # (future) TanStack Query mutations (пишем данные)
store/                  # Zustand stores (клиентское состояние)
  ├── user.ts          # Данные пользователя
  ├── ui.ts            # (future) UI состояние (тема, язык, etc)
  └── index.ts
lib/
  ├── api.ts           # Axios инстанс
  ├── queryClient.ts   # TanStack Query конфиг
  └── ...
services/              # API functions (остаются как были)
types/                 # TypeScript типы
public/                # Static files
```

## Data Flow

```
Page / Component
    ↓
Custom Hook (useQuery) ← TanStack Query
    ↓
Service Function ← listDailyWorkouts()
    ↓
API Client ← apiClient.get()
    ↓
Backend
```

## TanStack Query (для API данных)

### Структура hooks/queries/

**Правило:** Один файл = одна сущность

```typescript
// hooks/queries/workouts.ts
export function useGetDailyWorkouts() {
  return useQuery({
    queryKey: ['dailyWorkouts'], // ← Уникальный ключ (кэш)
    queryFn: listDailyWorkouts, // ← Функция из services/
  })
}

// hooks/queries/programs.ts
export function useGetUserPrograms() {
  return useQuery({
    queryKey: ['userPrograms'],
    queryFn: listUserPrograms,
  })
}
```

### Использование в компонентах

```typescript
'use client';
import { useGetDailyWorkouts } from '@/hooks/queries';

export function Dashboard() {
  const { data: workouts, isLoading, error } = useGetDailyWorkouts();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка</div>;

  return <div>{workouts?.workouts.length} тренировок</div>;
}
```

### Кэширование и рефетчинг

```typescript
// Изменить стандартные параметры в lib/queryClient.ts:
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Данные свежие 5 минут
      gcTime: 1000 * 60 * 10, // Удалить из памяти после 10 минут
      retry: 1, // Повторить 1 раз при ошибке
      refetchOnWindowFocus: false, // Не рефетчить когда фокус вернулся
    },
  },
})
```

## Zustand (для клиентского состояния)

### Структура store/

**Правило:** Один файл = одна сущность/модуль

```
store/
├── user.ts          # User данные (с persist в localStorage)
├── programs.ts      # Programs viewMode, filters
├── auth.ts          # Auth форм состояния (login, register)
└── index.ts
```

### Примеры

**User store (с сохранением в localStorage):**

```typescript
// store/user.ts
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'user-store' }, // Сохранять в localStorage
  ),
)
```

**Programs store (состояния программ):**

```typescript
// store/programs.ts
export const useProgramsStore = create<ProgramsStore>((set) => ({
  viewMode: 'my',
  setViewMode: (mode) => set({ viewMode: mode }),
}))
```

**Auth store (состояние форм аутентификации):**

```typescript
// store/auth.ts
export const useLoginFormStore = create<LoginFormState>((set) => ({
  email: '',
  password: '',
  fieldError: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFieldError: (error) => set({ fieldError: error }),
  reset: () => set({ email: '', password: '', fieldError: '' }),
}))

export const useRegisterFormStore = create<RegisterFormState>((set) => ({
  email: '',
  password: '',
  fieldError: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFieldError: (error) => set({ fieldError: error }),
  reset: () => set({ email: '', password: '', fieldError: '' }),
}))
```

### Использование в компонентах

```typescript
'use client';
import { useUserStore, useProgramsStore, useLoginFormStore } from '@/store';

export function MyComponent() {
  // User данные
  const user = useUserStore((state) => state.user);

  // Programs состояние
  const viewMode = useProgramsStore((state) => state.viewMode);
  const setViewMode = useProgramsStore((state) => state.setViewMode);

  // Form состояние
  const email = useLoginFormStore((state) => state.email);
  const setEmail = useLoginFormStore((state) => state.setEmail);

  return (
    <div>
      <h1>{user?.email}</h1>
      <button onClick={() => setViewMode('templates')}>
        View: {viewMode}
      </button>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
  );
}
```

## Когда что использовать

| Задача                                 | Использовать                                                   |
| -------------------------------------- | -------------------------------------------------------------- |
| Загрузить данные с API                 | `useQuery` из `hooks/queries/`                                 |
| Отправить данные на сервер             | `useMutation` из `hooks/mutations/`                            |
| Состояние форм                         | `useLoginFormStore`, `useRegisterFormStore` из `store/auth.ts` |
| Состояние programs (viewMode, filters) | `useProgramsStore` из `store/programs.ts`                      |
| Хранить данные юзера                   | `useUserStore` из `store/user.ts` (persisted)                  |
| Добавить новое UI состояние            | Создать новый файл в `store/` по имени модуля                  |
| Кэширование между переходами           | TanStack Query (автоматически)                                 |
| Синхронизация между вкладками          | TanStack Query (автоматически)                                 |

## Статус миграции

### TanStack Query (API данные)

✅ **Полностью переведено:**

- Dashboard (тренировки) - `hooks/queries/workouts.ts`
- Programs (программы) - `hooks/queries/programs.ts`
- Workouts detail (упражнения) - `hooks/queries/workouts.ts`
- Auth forms - `hooks/mutations/auth.ts`

### Zustand (Клиентское состояние)

✅ **Организовано по модулям:**

- Programs состояние - `store/programs.ts` (viewMode)
- Auth формы - `store/auth.ts` (login, register form state)
- Данные юзера - `store/user.ts` (с persist в localStorage)

### Итого:

✅ **Нет useState в компонентах** (только для временных UI элементов типа dropdown)
✅ **Нет прямых импортов сервисов в компонентах**
✅ **Единая система управления состоянием**

## Расширение

### Добавить новый query hook

1. Создать функцию в `services/`
2. Добавить hook в `hooks/queries/newEntity.ts`
3. Экспортировать в `hooks/queries/index.ts`
4. Использовать в компонентах

```typescript
// services/exercises.ts
export async function getExerciseDetail(id: string) {
  return apiClient.get(`/exercises/${id}`)
}

// hooks/queries/exercises.ts
export function useGetExerciseDetail(id: string) {
  return useQuery({
    queryKey: ['exercise', id],
    queryFn: () => getExerciseDetail(id),
    enabled: !!id,
  })
}

// hooks/queries/index.ts
export * from './exercises'

// Использование в компоненте
const { data: exercise } = useGetExerciseDetail(id)
```

### Добавить новую mutation (POST/PUT/DELETE)

```typescript
// hooks/mutations/exercises.ts
export function useCreateExercise() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => createExercise(data),
    onSuccess: () => {
      // Инвалидировать связанные query для рефетчинга
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
    onError: (error) => {
      console.error('Ошибка создания:', error)
    },
  })
}

// Использование
const createMutation = useCreateExercise()
await createMutation.mutateAsync({ title: 'Новое упражнение' })
```

### Добавить новый Zustand store

```typescript
// store/theme.ts
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}))

// store/index.ts
export { useThemeStore } from './theme'
```

### Добавить mutations (когда понадобятся POST/PUT/DELETE)

```typescript
// hooks/mutations/workouts.ts
export function useCreateWorkout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => createWorkout(data),
    onSuccess: () => {
      // Рефетчить связанные query
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    },
  })
}

// Использование
const createMutation = useCreateWorkout()
await createMutation.mutateAsync({ title: 'Новая тренировка' })
```

## Dev Tools

TanStack Query включает Dev Tools для отладки:

```typescript
// app/providers.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```
