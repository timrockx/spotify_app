## Spotify Profile App

#### Last Modified: May 26, 2023

<br />
[View the Application](https://spotify-app-ruddy-one.vercel.app/)   


***Note: The app is currently running on a development mode under the Spotify API, hence only invited users can access the application. To gain access, please contact me at timothyyinlee@gmail.com.***

---

#### Project Description

The Spotify Profile App uses the Spotify API to connect to a user's profile and retrieve specific information about the user's listening history. Users can view their most listened to artists and songs, and have easy access to listen to both on Spotify.


#### Tech Stack Used

This project was created using CRA (Create-React-App) in the frontend and is styled with Tailwind CSS and uses JSX syntax. In the backend, the app runs on an Express server with hosts specific routes to target endpoints that retrieve unique user data. The server uses the **Spotify Web API Node** package, which offers easier access into specific endpoints within the Spotify API.

To deploy the application, the project utilized Vercel to deploy the client-side code as it is 'serverless.' The browswer then connects with the Express server that is hosted using Render's Web Service.


#### Acknowledgements

The baseline for this application was derived from a variety of online sources and tutorials. Here are a few references that fueled a majority of the project's development:

- https://tailwindcss.com
- https://developer.spotify.com
- https://github.com/thelinmichael/spotify-web-api-node

