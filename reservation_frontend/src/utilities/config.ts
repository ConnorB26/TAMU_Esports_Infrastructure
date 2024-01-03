const isDevelopment = process.env.REACT_APP_DEVELOPMENT === 'true';

export const backendUrl = isDevelopment
    ? 'http://localhost:3001'
    : 'https://api.tamuesports.com';

export const oauthUrl = isDevelopment
    ? 'https://discord.com/api/oauth2/authorize?client_id=1156434010193543198&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Freservation_auth%2Fdiscord%2Fredirect&scope=identify'
    : 'https://discord.com/api/oauth2/authorize?client_id=1085016282723778630&response_type=code&redirect_uri=https%3A%2F%2Fapi.tamuesports.com%2Freservation_auth%2Fdiscord%2Fredirect&scope=identify';