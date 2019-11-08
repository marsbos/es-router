import { LitElement } from '../node_modules/lit-element/lit-element.js';
import { html } from '../node_modules/lit-html/lit-html.js';
import { route } from '../src/es-route.js';

customElements.define('todo-add', class extends LitElement {

  static get properties() {
    return {
      route: Object,
    }
  }

  connectedCallback() {
    const unregister = route(this) // returns proxy: {}
    ['292828282'](({ head, tail }) => {
      console.log('todo-add, head', head);
      console.log('todo-add, tail', tail);
      return tail;
    })
    .use(({ head, tail }) => {
      this.route = head;
      this.requestUpdate('route');
      return tail;
    });
    super.connectedCallback();
  }

  render() {
    return html`
      <div>
        Add todo. On route: ${this.route.head}
        tail: ${this.route.tail}
      </div>
    `;
  }
});
