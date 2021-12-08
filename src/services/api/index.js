const { default: axios } = require('axios');
const DOMAIN = 'http://localhost:5000/';

export async function saveFavorite(props) { 
    const body = props.doodle;
    delete body.translations;
    delete body.high_res_width;
    delete body.high_res_height;
    delete body.translated_blog_posts;
    const url = `${DOMAIN}save`;

    try {
        const body = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            body: JSON.stringify(props.doodle) // body data type must match "Content-Type" header
        };
        const config = { headers: { 'user': `${props.authState.user.name}` } }
        const response = await axios.post(url, body, config);
        return response.data.success;

    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function fetchFavorites(user) {
    const url = `${DOMAIN}favorites?user=${user}`;
    const response = await axios.get(url);

    // console.log(`Fetched favorites (${response.data.length})`);
    return response.data;
}