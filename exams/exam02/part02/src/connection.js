
function requestUserId() {
    return fetchJsonFrom('/users','post', null).then(json => {
        return json.currentId;
    }).catch((error) => {
        if (error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });
}

function getUserList() {
    return fetchJsonFrom('/users','get', null).then(json => {
        return json;
    }).catch((error) => {
        if (error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });
}

function fetchJsonFrom(url, method, bodydata) {
    return fetch(url, {
        method: method,
        //headers: JSON.stringify(headerObject),
        body: JSON.stringify(bodydata)        
    }).then(response => response.ok ? response.json() : Promise.reject(response.status))
    .catch((error) => {
        return Promise.reject(error.toString());
    });
}

module.exports = {
    requestUserId : requestUserId,
    getUserList : getUserList,
    fetchJsonFrom : fetchJsonFrom
}