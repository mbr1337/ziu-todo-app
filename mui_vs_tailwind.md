# 7. Tabela porównawcza - MUI vs Tailwind CSS

> Skala ocen: 1 (najgorzej) - 5 (najlepiej)

| Kryterium | Material UI (MUI) | Tailwind CSS | Zwycięzca |
|---|---|---|---|
| **DX - szybkość startu** | 5 - gotowe komponenty od razu, zero konfiguracji | 3 - wymaga konfiguracji, nauki klas użytkowych | MUI |
| **DX - czytelność kodu** | 4 - JSX jest czysty, logika stylów oddzielona w `sx` | 2 - Wymagany ultra szeroki monitor, a najlepiej dwa, żeby przeczytać wszystkie klasy bez scrollowania | MUI |
| **Bundle size (prod)** | 2 - duży bundle nawet po tree-shakingu | 4 - generuje tylko użyte klasy, bardzo mały CSS | Tailwind |
| **Customizacja stylów** | 3 - możliwa przez `theme`, ale ograniczona poza nim | 5 - pełna kontrola na poziomie każdej właściwości CSS | Tailwind |
| **Wsparcie dla TypeScript** | 5 - pełne typy dla wszystkich props i theme tokens | 3 - klasy są stringami, brak statycznej weryfikacji | MUI |
| **Dostępność (a11y) out-of-box** | 5 - role ARIA, focus management, keyboard nav wbudowane | 2 - brak wbudowanej a11y, odpowiedzialność na deweloperze | MUI |
| **Responsive design (utility)** | 3 - breakpointy przez `sx`/`Grid`, mniej intuicyjne | 5 - klasy `sm:`, `md:`, `lg:` bezpośrednio w JSX | Tailwind |
| **Theming / design tokens** | 5 - centralny `theme.ts`, spójny system tokenów | 3 - tokeny w `tailwind.config`, mniej zintegrowane z JS | MUI |
| **Krzywa uczenia się** | 3 - dużo API do poznania (Grid, sx, theme override) | 4 - łatwy start, trudniejsze zaawansowane wzorce | Tailwind |
| **Integracja z Figma / DS** | 4 - Material Design zbieżny z Figma DS, gotowe komponenty | 3 - wymaga ręcznego mapowania tokenów z Figma | MUI |

---

## 7.1 Kluczowe spostrzeżenia - wnioski

**Kiedy wybrać MUI?**
> Gdy projekt wymaga szybkiego dostarczenia spójnego, dostępnego UI bez budowania systemu komponentów od zera - np. dashboardy wewnętrzne, panele admina, aplikacje enterprise. MUI sprawdza się też, gdy zespół używa TypeScripta i zależy mu na silnym typowaniu propsów oraz centralnym zarządzaniu motywem.

**Kiedy wybrać Tailwind?**
> Gdy priorytetem jest pełna kontrola nad wyglądem, mały bundle produkcyjny i pixel-perfect implementacja własnego design systemu. Tailwind jest lepszym wyborem dla projektów z mocno spersonalizowanym designem (np. landing pages, aplikacje z własną identyfikacją wizualną), gdzie gotowe komponenty MUI byłyby trudniejsze do nadpisania niż napisanie stylów od zera.

**Kiedy łączyć obie biblioteki (MUI + Tailwind)?**
> Gdy chcemy korzystać z gotowych, dostępnych komponentów MUI (Dialog, Drawer, Select) i jednocześnie szybko stylować własne elementy pomocnicze utility klasami Tailwind
