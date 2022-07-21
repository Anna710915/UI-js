"use strict"

export class HtmlTemplate{
    static getCertificateTemplate(c, tags){
        return `
        <li class="catalog-item">
            <div class="product-item">
                <img src="/image/anime.jpg">
                <div class="item-button">
                    <a href="#" class="button"><span class="material-icons">shopping_cart</span>Cart</a>
                </div>
            </div>
            <div class="product-title">
                <a href="/nodejs/cites/product.html?_ijt=mcqjl8cgidrp1njsah1q33911h&_ij_reload=RELOAD_ON_SAVE">${c.name}</a>
                <p class="tags">${tags}</p>
                <span class="product-price">${c.price}</span>
            </div>
        </li>`;
    }

    static getTagsTemplate(name){
        return `
            <span class="added">${name}</span> `;
    }
}
