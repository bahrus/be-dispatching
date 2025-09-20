// @ts-check
export class MyCustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;
        shadowRoot.addEventListener('402735ed-b9e8-4ef4-9e0d-3a6b385de863', e => {
            shadowRoot.querySelector('div').textContent = 'message heard.';
        });
        shadowRoot.innerHTML = String.raw `
            <input be-dispatching="of bubbling, composed, cancelable, replacing event 402735ed-b9e8-4ef4-9e0d-3a6b385de863 on change.">
            <div></div>
            <be-hive></be-hive>
        `;
    }
}
customElements.define('my-custom-element', MyCustomElement);
