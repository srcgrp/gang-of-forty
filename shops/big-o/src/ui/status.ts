import type { MessageType, LoadState} from '../types';

// Show message for loading data and errors
// container: html tag which message be shown in that, text : the content of message, type: load or error
function showMessage(container: string, text: string, type: MessageType ) {
    const content: HTMLParagraphElement = document.createElement("p");
    content.textContent = text;
    content.classList.add("msg");

    if (type === "load") {
        content.classList.add("load-msg");
        content.setAttribute("role", "status");
    }
    else {
        content.classList.add("error-msg");
        content.setAttribute("role", "alert");
    }
    const box = document.querySelector<HTMLElement>(container);
    if ( box === null) {
        console.error(`index.html is missing ${container} element`)
    }
    else{
        box.append(content);
    }
}

// Removes the message (loading or error) shown by showMessage.
// container: CSS selector of the section that holds it (e.g. "#dairy").
// Does nothing if there is no message.
function clearMessage(container: string) {
    const box = document.querySelector<HTMLElement>(container);
    if ( box === null) {
        console.error(`index.html is missing ${container} element`)
    }else {
        const message = box.querySelector<HTMLParagraphElement>(".msg");
        message?.remove(); 
    }  
}

// render different statuses
export function renderStatus(state: LoadState, container: string) {
    clearMessage(container);
    switch (state.status) {
        case 'loading': 
            showMessage(container, "در حال بارگذاری…", 'load');
            break;
        case 'success':
            break;
        case 'empty': 
            showMessage(container, "محصولی پیدا نشد …", 'load');
            break;
        case 'error': 
            showMessage(container, state.message , "error");
            break;
        default: {
            const unreachable: never = state;
            return unreachable;
        }
    }
}