export class MyCustomElement extends HTMLElement{
    
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.shadowRoot!.addEventListener('402735ed-b9e8-4ef4-9e0d-3a6b385de863', e => {
            console.log({e});
        })
        this.shadowRoot!.innerHTML = String.raw `
            <input be-dispatching='of bubbling, composed, cancelable, replacing event 402735ed-b9e8-4ef4-9e0d-3a6b385de863 on change.'>
            <be-hive></be-hive>
        `;
    }
}

customElements.define('my-custom-element', MyCustomElement);