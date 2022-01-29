export const select = {
  templateOf: {
    grid: '#template-grid',
  },
  containerOf: {
    pages: '#pages',
    stepHeader: '.step-header > h5',
    header: '.step-wrapper',
    finderWrapper: '.finder-wrapper',
    grid: '.grid',
    button: '#button-wrapper'
  },
  nav: {
    links: '.nav-link',
  },
  grid: {
    cell: '.cell',
    selectedCell: '.selected-cell',
    startCell: '.start-cell',
    endCell: '.end-cell',
  },
  button: '#button'
};

export const classNames = {
  pages: {
    active: 'active-page',
  },
  nav: {
    active: 'active-link',
  },
  step: {
    stepActive: 'step-active',
  },
  grid: {
    selectedCell: 'selected-cell',
    starCell: 'start-cell',
    endCell: 'end-cell',
  }
};


export const templates = {
  grid: Handlebars.compile(document.querySelector(select.templateOf.grid).innerHTML),
};

export const innerHTMLData = {
  headerOne: {
    headerTitle: 'DRAW ROUTES'
  },
  headerTwo: {
    headerTitle: 'PICK START AND FINISH'
  },
  headerThree: {
    headerTitle: 'THE BEST ROUTE IS...'
  },
  buttonOne: {
    buttonTitle: 'FINISH DRAWING'
  },
  buttonTwo: {
    buttonTitle: 'COMPUTE'
  },
  buttonThree: {
    buttonTitle: 'START AGAIN'
  },
};
