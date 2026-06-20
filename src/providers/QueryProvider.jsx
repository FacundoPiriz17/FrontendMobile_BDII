/**
 * QueryProvider
 *
 * Placeholder para integración futura con TanStack Query.
 * En la implementación actual los datos se manejan con useFetch
 * (hook propio basado en useState/useEffect), pero si se migra
 * a @tanstack/react-query este provider será el punto de entrada.
 *
 * Para activar TanStack Query:
 * 1. npm install @tanstack/react-query
 * 2. Descomentar el código de abajo
 * 3. Envolver con <QueryProvider> en app/_layout.jsx
 */

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60,      // 1 minuto
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

export function QueryProvider({ children }) {
    // return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    return children;
}
