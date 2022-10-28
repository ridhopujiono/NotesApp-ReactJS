const BaseUrl = 'https://notes-api.dicoding.dev/v1';
const Endpoint = [{
    'base' : BaseUrl,
    'login' : BaseUrl + '/login',
    'register' : BaseUrl + '/register',
    'user' : BaseUrl + '/users/me',
    'notes' : BaseUrl + '/notes',
    'notes_archived' : BaseUrl + '/notes/archived',
    'post' : BaseUrl + '/notes',
}];

export default Endpoint[0];