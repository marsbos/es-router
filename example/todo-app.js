import { LitElement } from '../node_modules/lit-element/lit-element.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { route } from '../src/es-route.js';

customElements.define('todo-app', class extends LitElement {

  connectedCallback() {
    this.productItem = 292828282;
    super.connectedCallback();
    const unregister = route() // returns proxy: {}
      .products(({ head, tail }) => {
        return async()=>{
          await import('./todo-add.js');
          return `<todo-add .head="${head}" .tail="${tail}"></todo-add>`;
        }
      })
      .shop(( { head, tail }) => {
        return async()=>{
          await import('./shop.js');
          return `<shop-page .head="${head}" .tail="${tail}"></shop-page>`;
        }
      })
      .use(tpl => {
         this.tpl = tpl;
         //this.renderRoot.querySelectorAll('#routes').item(0).innerHTML = tpl;
         this.requestUpdate('tpl');
      });
  }

  render() {
    return html`
      <es-route-anchor>
        <a href="/products">Products</a>
        <a href="/products/${this.productItem}/details">Product item</a>
        <a href="/shop/browse">Shop</a>
      </es-route-anchor>
      ${html`${this.tpl}`}
    `;
  }
});
