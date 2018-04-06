
export function getJsonFrom(url) {
    return fetch(url)
    .then(response => {
        if (response.ok) return response.json();
        else return Promise.reject(response.status);
    })
    .then(json => Promise.resolve(json))
    .catch((error) => {
        return Promise.reject(error.toString());
    });
}

export function fetchJsonFrom(url, method, bodydata) {
    return fetch(url, {
        method: method,
        //headers: JSON.stringify(headerObject),
        body: JSON.stringify(bodydata)        
    }).then(response => {
        if (response.ok) return response.json();
        else return Promise.reject(response.status);
    })
    .then(json => Promise.resolve(json))
    .catch((error) => {
        return Promise.reject(error.toString());
    });
}


