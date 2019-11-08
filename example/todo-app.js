import { LitElement } from '../node_modules/lit-element/lit-element.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { route } from '../src/es-route.js';

customElements.define('todo-app', class extends LitElement {

  connectedCallback() {
    this.productItem = 292828282;
    super.connectedCallback();
    const unregister = route(this) // returns proxy: {}
      .products(({ head, tail }) => {
        import('./todo-add.js');
        return { head, tail };
      })
      .shop(( { head, tail }) => {
        import('./shop.js');
        return { head, tail };
//        return `<shop-page .route=${tail}></shop-page>`;
      })
      .use(({ head, tail }) => {
        this.route = { head, tail };
        this.requestUpdate('route');
        return head;
      });
  }

  render() {
    
    return html`
      <es-route-anchor>
        <a href="/products">Products</a>
        <a href="/products/${this.productItem}/details">Product item</a>
        <a href="/shop/browse">Shop</a>
      </es-route-anchor>

      <!--es-route-render>
        ${this.route}
      </es-route-render-->
      <todo-add .route="${this.route}"></todo-add>
      <shop-page .route="${this.route}"></shop-page>
    `;
  }
});
