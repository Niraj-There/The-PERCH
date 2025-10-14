const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// Load token from environment variables
const mapToken = process.env.MAP_TOKEN;

if (!mapToken) {
    console.error('Warning: MAP_TOKEN not found in environment variables');
}

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports = geocodingClient;