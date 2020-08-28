import SpotifyWebApi from "spotify-web-api-js"

export const initialState = {
  token: null,
  spotify: new SpotifyWebApi(),
  player: null,
  token_callback: null,
  user: null,
  playlists: null,
  playing: false,
  item: null,
  recent_items: null,
  top_tracks: null,
  discover_weekly: null,
  top_artists: null,
};

const reducer = (state, action) => {
  console.log('reducing...', action);
  switch (action.type) {
    case "SET_TOKEN":
      state.spotify.setAccessToken(action.token)
      if(state.token_callback) {
        state.token_callback(action.token)
      }
      return {
        ...state,
        token: action.token
      };

    case "SET_TOKEN_CALLBACK":
      if(state.token) {
        action.token_callback(state.token)
      }
      return {
        ...state,
        token_callback: action.token_callback
      };

    case "SET_PLAYER":
      return {
        ...state,
        player: action.player
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_TOP_TRACKS":
        return {
          ...state,
          top_tracks: action.top_tracks,
        };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };

    case "SET_RECENT":
      return {
          ...state,
          recent_items: action.recent_items,
      };
    default:
      return state;
  }
};

export default reducer;
