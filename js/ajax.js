"use strict"

export class Ajax{
    ajax(data){
        const request = new XMLHttpRequest();
        request.open(data.method, data.url + this.formatParams(data.params));

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    data.successCallback(request.response);
                } else {
                    data.errorCallback(request.response);
                }
            }
        });
        request.send();
    }

    formatParams(params){
        return "?" + Object
            .keys(params)
            .map(function(key){
                return key+"="+encodeURIComponent(params[key])
            })
            .join("&")
    }
}