const serverURL = 'https://jsonplaceholder.typicode.com/posts';

class API {
    static getServerData = (success, failure) => {
        fetch(serverURL)
            .then(response => response.json())
            .then(success)
            .catch(failure)
    }

    static getOneData = (success, failure, id) => {
        fetch(`${serverURL}/${id}`)
            .then(response => response.json())
            .then(success)
            .catch(failure)
    }

    static addData = (success, failure, dataTitle, dataBody, dataUserID) => {
        fetch(`${serverURL}`, {
            method: 'POST',
            body: JSON.stringify({
                title: dataTitle,
                body: dataBody,
                userId: dataUserID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(success)
            .catch(failure)
    }
};

