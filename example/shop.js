import { LitElement } from '../node_modules/lit-element/lit-element.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { route } from '../src/es-route.js';

customElements.define('shop-page', class extends LitElement {

  static get properties() {
    return {
      head: String,
      tail: String,
    }
  }

  connectedCallback() {
    const unregister = route() // returns proxy: {}
    .browse(({head, tail}) => {
      console.log('shop.browse, head', head);
      console.log('shop.browse, tail', tail);
      return { head, tail };
    })
    .buy(({ head, tail }) => {
      console.log('shop.buy, head', head);
      console.log('shop.buy, tail', tail);
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
        Shop page. On route: ${this.head}
        tail: ${this.tail}
        
      </div>
    `;
  }
});
