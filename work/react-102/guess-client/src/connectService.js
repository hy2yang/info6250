export const getId = () => {
    return fetch('/api')
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('connection-fail') );
};

export const submit = (guess, id) =>{
    return fetch('/api', {
        method: 'POST',
        body: JSON.stringify( { guess : guess, id : id } )
    })
    .then( response => response.json() )
    .catch( () => Promise.reject('connection-fail') );
};