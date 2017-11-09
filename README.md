# Mojo Screens

This project depends on the rest http api that runs via Node: https://github.com/jishi/node-sonos-http-api/tree/493c27ae0c64ba1b22e7a3683b641851040c24bc To test locally you will need to download that repo seperately and follow its setup instructions.

One that is running, by default on port 5005, this project will connect to it to access the Sonos information.

## Individual Mode

You can request the individual assets of the page via the /individual route. It reads the query string and searches for any id that matches:

 - http://localhost:3003/individual?current-track-info
 - http://localhost:3003/individual?nextTrackArtwork
 - http://localhost:3003/individual?currentTrackArtwork
 - http://localhost:3003/individual?prevTrackArtwork

Due to the way this has been built, the previous track asset will not update until the next time the track changes.
