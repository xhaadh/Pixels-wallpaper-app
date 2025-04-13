# Welcome to your my Pixels Wallpaper Expo app 👋

Pixels is a modern, responsive wallpaper application built using Expo and React Native. The primary goal of this project is to offer users a seamless experience in browsing high-quality images fetched from the Pixabay API. The app is designed to work beautifully on all mobile devices and on the web, ensuring a consistent and engaging user interface regardless of screen size.

Key Features:

- Dynamic Image Loading:
   The app retrieves images from the Pixabay API. With infinite scrolling enabled, additional images load automatically as the user scrolls down the page.

- Powerful Search Functionality:
   A fully functional search bar allows users to quickly search for images using keywords. The search feature is debounced for performance, ensuring that results are updated efficiently.

- Category Filtering:
   Users can select from a range of categories to view images tailored to their interests. When a category is selected, the app updates the displayed images to reflect only those that match the category.

- Interactive Image View:
   Tapping on any image brings up a detailed view where users have multiple options:
    * Download: Save images locally to your device with ease.
    * Share: Instantly share your favorite wallpapers with friends via native sharing options.
    * View: Enjoy a full-screen view of the image with high resolution.

- Responsive Design:
   Built to be fully responsive, Pixels provides an optimal user experience whether you're on a smartphone, tablet, or desktop. The layout adapts seamlessly to different screen sizes.

Technical Highlights:

- Expo and React Native:
   The app leverages the power and flexibility of Expo for React Native, ensuring rapid development and efficient cross-platform functionality.
   
- Pixabay API Integration:
   All images are sourced via the Pixabay API, which provides a broad library of high-quality images. The API calls are managed with Axios and include proper error handling and dynamic URL formatting for search queries and category filters.

- Smooth Performance:
   The application uses debounced search inputs and dynamic infinite scroll to deliver a smooth browsing experience without performance hitches.

- Modern Code Practices:
   With the use of custom hooks, state management using React's useState and useEffect, and modularized components like ImageGrid and Categories, the codebase is organized and scalable, making future enhancements straightforward.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

This will launch the Expo development server. You can run the app on a mobile device using the Expo Go app or in the web browser.

Whether you're searching for the perfect wallpaper or exploring modern cross-platform development, Pixels serves as both a practical application and an excellent example of using Expo and React Native to build responsive, interactive mobile and web apps.



















