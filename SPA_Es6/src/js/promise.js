export function Es6AjaxGet(url) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();

        req.open("GET", url);
        //req.setRequestHeader("App-Key", 'todo');
        //req.setRequestHeader("App-Id", 'todo');

        req.onload = () => {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = () => {
            reject(new Error("Network error"));
        };
        req.send();
    });
}

export function Es6AjaxPost(url,params) {

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

     return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();

        req.open("POST", url);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.setRequestHeader("Content-length", query.length);

        req.onload = () => {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = () => {
            reject(new Error("Network error"));
        };

        req.send(query);

    });
}
