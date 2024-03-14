## Website

You can access the website via [TMDB](https://luzhaigo.github.io/TMDB/).

## Done

### App Features

- The app should have a "home" page displaying trending films and TV shows in two different rails.
- Users can search for films and TV shows using the search bar in the top right corner.
- Users should be able to view detailed information for any given film, including cast, description, rating, release date, etc.
- Users should also be able to view detailed information for any TV show, including number of seasons, cast, rating, etc.
- Navigation within the app should be possible using the arrow keys and the Enter key on a keyboard, with components displaying a focus state to highlight the user's current position.
- Users can retrieve previous data from the SWR cache.
- Configuration data should be preloaded in the critical rendering path via link tags and the SWR preload function.
- Preconnection to the API domain should be established as soon as possible to reduce the latency of API responses.
- Below-the-fold images should be lazy loaded to improve latency.
- Media details should be preloaded when hovering over cards or navigating with arrow keys.
- React components should be tested using testing-library/react.

### Others

- Development of the app is done using ESLint and Vite.
- Environment variables are used to inject sensitive or nonsensitive data when building the app.
