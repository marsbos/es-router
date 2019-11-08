const pipeFromEvent = (eventDispatcher, event) => (finalizer,...cb) => {
  //const isChildOfEventDispatcher = isChildOf(eventDispatcher);
  const listener = async({ detail: { url, path } }) => {
    const match = cb.find(c => {
      // match with location.pathname
      const locationPath = location.pathname;
      // ^.*(products)(\/.*)? => /products, /products/36363/details
      const matches = url.match(c.pattern);
      if (matches) {
        // pattern/head: /products, url: /products/36363/details
        // is url's head same as c.head?
        const { groups: { head: urlHead, tail } } = matches;

        const locMatch = locationPath.match(c.pattern);
        debugger;
        if (locMatch) {
          const { groups: { head: locHead } } = locMatch;
          if (urlHead === locHead && !tail) {
            // no change in head, skip this one:
            return null;
          }
        }
        c.tail = tail;
        return c;
      } else {
        return null;
      }
    });
    if (match) {
      const cfgCb = match.callback({ head: match.head, tail: match.tail });
      finalizer(await cfgCb());
      history.pushState({}, '', `${match.head}`);
    }
  };
  document.addEventListener(event, listener, true);
  return () => {
    document.removeEventListener(event, listener, true);
  };
};

export const route = () => {
  const rListener = pipeFromEvent(document, 'navigate-changed');
  let listeners = [];
  const handler = {
    get(target, key, receiver) {
      if (!(key in target)) {
        // if key is regex?
        console.log('proxy. key', key);
        target[key] = this.apply.bind(this, target, key);
      }
      return Reflect.get(target, key);
    },
    apply(t, key, target, thisArg, args) {
      if (key === 'use') {
        return rListener(target, ...listeners);
      } else {
      // target is callback function:
      // ^.*(products)(\/.*)
        if (location.pathname==="" || location.pathname==='/') {
          listeners = [...listeners, 
            { head: `/${key}`, tail:'', value: key, pattern: new RegExp(`(?<head>\/${key})(?<tail>.*)`), callback: target }];
        } else {
          listeners = [...listeners, 
            { head: location.pathname, tail:'', value: key, pattern: new RegExp(`(?<head>\\${location.pathname})(?<tail>\\/${key})?`), callback: target }];
        }
        return tree({...t});
      }
    },
  };
  const tree = (obj = {}) => {
    return new Proxy(obj, handler);
  };
  return tree();
};

const template = document.createElement('template');
template.innerHTML = `
<slot id="slot"></slot>
`;
(() => {
  customElements.define(
    'es-route-anchor',
    class extends HTMLElement {
      _prepareDom() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._getSlottedElements = this._getSlottedElements('a').bind(this);
        this._elementClickEventListener = this._elementClickEventListener.bind(this);
        this.addEventListener('click', this._elementClickEventListener, true);
      }

      connectedCallback() {
        this._prepareDom();
      }

      disconnectedCallback() {
        this.removeEventListener('click', this._elementClickEventListener, true);
      }

      _getSlottedElements(tagName) {
        return () => Array.from(this.querySelectorAll(tagName));
      }

      _elementClickEventListener(evt) {
        if (this._getSlottedElements().find((a) => a === evt.target)) {
          evt.preventDefault();

          this.dispatchEvent(new CustomEvent('navigate-changed', 
            { detail: { url: evt.target.pathname, path: evt.path }, bubbles: true, composed: true }));
        }
      }
    }
  );
})();

(() => {
  customElements.define(
    'es-route-render',
    class extends HTMLElement {
      _prepareDom() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const slot = this.shadowRoot.querySelector('#slot');
        slot.addEventListener('slotchange', e => {
          console.log('light dom children changed!', e);
        });
      }

      connectedCallback() {
        this._prepareDom();
      }

      disconnectedCallback() {
      }

      _getSlottedElements(tagName) {
        return () => Array.from(this.querySelectorAll(tagName));
      }

      _elementClickEventListener(evt) {
        if (this._getSlottedElements().find((a) => a === evt.target)) {
          evt.preventDefault();

          this.dispatchEvent(new CustomEvent('navigate-changed', 
            { detail: { url: evt.target.pathname, path: evt.path }, bubbles: true, composed: true }));
        }
      }
    }
  );
})();
