import { LitElement } from '../node_modules/lit-element/lit-element.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { route } from '../src/es-route.js';

customElements.define('shop-page', class extends LitElement {

  static get properties() {
    return {
      route: String,
    }
  }

  connectedCallback() {
    const unregister = route(this) // returns proxy: {}
    [`browse`](({head, tail}) => {
      console.log('shop, head', head);
      console.log('shop, tail', tail);
      return { head, tail };
    })
    .use(({ head, tail }) => {
      return tail;
    });
    console.log('ConnectedCb: Shop-page, route', this.route)
    super.connectedCallback();
  }
  
  render() {
    return html`
      <div>
        Shop page. On route: ${this.route.head}
        tail: ${this.route.tail}
        <es-route-anchor>
          <a href="${this.route.head}/browse">Browse shop</a>
        </es-route-anchor>
      </div>
    `;
  }
});
