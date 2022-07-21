"use strict"

import {HtmlTemplate} from "./template.js";
import {Ajax} from "./ajax.js";

export const loadMoreBlock = document.querySelector('._load-more');
export const windowHeight = document.documentElement.clientHeight;
export const scrollButton = document.querySelector(".scroll");


export class ScrollWindow{

    constructor(page = 1, size = 9) {
        this.page = page;
        this.size = size;
    }

    loadImage(){
        if(this.checkHeight()){
            if (!document.querySelector('._loading-icon')) {
                loadMoreBlock.insertAdjacentHTML(
                    'beforeend',
                    `<div class="_loading-icon">
                    <img src="/image/5Q0v.gif"></div>`
                );
            }
        }
    }

    loadMore(){
        if(this.checkHeight()){
            if(loadMoreBlock.classList.contains('.tag')){
                this.findCertificatesByTagName(sessionStorage.getItem('tag'));
            } else if(loadMoreBlock.classList.contains('.search')){
                this.searchByPartNameOrDescription(sessionStorage.getItem('search'));
            } else {
                this.showCertificates();
            }
        }
    }

    checkHeight(){
        const loadMoreBlockPos = loadMoreBlock.getBoundingClientRect().top + scrollY;
        const loadMoreBlockHeight = loadMoreBlock.offsetHeight;
        return scrollY > (loadMoreBlockPos + loadMoreBlockHeight) - windowHeight;
    }

    showCertificates(){
        new Ajax().ajax({
            url: 'http://localhost:8080/certificates/certificate',
            method: 'GET',
            params: {
                page: this.page,
                size: this.size
            },
            successCallback: resp => {
                const data = JSON.parse(resp);
                this.drawCertificates(data._embedded, data._links);
            },
            errorCallback: resp => {
                alert('Something went wrong during fetching certificates data');
            }
        });

    }

    drawCertificates(data, links) {
        if(data?.certificateDtoList){
            data.certificateDtoList.forEach(c => {
                let stringTags = ``;
                let tags = c.tags;
                tags.forEach(t => stringTags += HtmlTemplate.getTagsTemplate(t.name));
                const certificateBlock = HtmlTemplate.getCertificateTemplate(c, stringTags);
                loadMoreBlock.insertAdjacentHTML('beforeend', certificateBlock);
                let tagList = document.querySelectorAll('.tags .added');
                for(let tag of tagList){
                    tag.addEventListener("click", function (){
                        loadMoreBlock.innerHTML = '';
                        loadMoreBlock.classList.add('.tag');
                        loadMoreBlock.classList.remove(".search");
                        sessionStorage.setItem('tag', tag.innerText);
                        new ScrollWindow().findCertificatesByTagName(tag.innerText);
                    });
                }
                tagList.forEach(tag => tag.classList.remove('added'));
            });
            this.setPage(links);
        }

        if (document.querySelector('._loading-icon')) {
            document.querySelector('._loading-icon').remove();
        }

    }

    searchByPartNameOrDescription(text){
        new Ajax().ajax({
            url: 'http://localhost:8080/certificates/certificate/search',
            method: 'GET',
            params:{
                part: text,
                page: this.page,
                size: this.size
            },
            successCallback: resp => {
                const data = JSON.parse(resp);
                this.drawCertificates(data._embedded, data._links);
            },
            errorCallback: resp => {
                alert('Something went wrong during fetching certificates data');
            }
        });
    }

    findCertificatesByTagName(tagName){
        new Ajax().ajax({
            url: 'http://localhost:8080/certificates/certificate',
            method: 'GET',
            params: {
                tag_name: tagName,
                page: this.page,
                size: this.size
            },
            successCallback: resp => {
                const data = JSON.parse(resp);
                console.log(data._links);
                this.drawCertificates(data._embedded, data._links);
            },
            errorCallback: resp => {
                alert('Something went wrong during fetching certificates data');
            }
        });
    }

    setPage(links){
        let link = links.next.href;
        let indexAfterPageSymbol = link.lastIndexOf('&');
        let indexPage = link.indexOf('page=') + 5;
        this.page = link.slice(indexPage, indexAfterPageSymbol);
    }
}








