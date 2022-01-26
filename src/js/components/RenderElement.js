import { select, templates} from '../settings.js';
import { utils } from '../utils.js';

class RenderElement {
  constructor(handlebarsDataHeader, handlebarsDataButton) {
    const thisRenderElement = this;

    thisRenderElement.renderElement(handlebarsDataHeader, handlebarsDataButton);
  }

  renderElement(handlebarsDataHeader, handlebarsDataButton) {
    const thisRenderElement = this;

    // render header
    const generatedHeaderHTML = templates.header(handlebarsDataHeader);

    thisRenderElement.header = utils.createDOMFromHTML(generatedHeaderHTML);

    const headerWrapper = document.querySelector(select.containerOf.header);

    headerWrapper.appendChild(thisRenderElement.header);

    // render button
    const generatedButtonHTML = templates.button(handlebarsDataButton);

    thisRenderElement.button = utils.createDOMFromHTML(generatedButtonHTML);

    const buttonWrapper = document.querySelector(select.containerOf.button);

    buttonWrapper.appendChild(thisRenderElement.button);
  }
}

export default RenderElement;