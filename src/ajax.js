export function load(url) {
    let data;

    function reqListener() {
        // data = JSON.parse(this.responseText);
        // console.log(data);
        return JSON.parse(this.responseText)
        // return data;
    }

    function reqError(err) {
        // console.log('Fetch Error :-S', err);
        return 'Fetch Error :-S' + err;
    }

    let oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('get', url, true);
    oReq.send();

    return data;
}

// export default load();