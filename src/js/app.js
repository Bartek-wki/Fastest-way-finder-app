import { select, classNames } from './settings.js';
import DrawRoutes from './components/DrawRoutes.js';
import SelectStartAndEnd from './components/SelectStartAndEnd.js';
import Compute from './components/Compute.js';
import startAgain from './components/startAgain.js';
import Grid from './components/Grid.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    
    const idfromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idfromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  activateNewStep: function () {
    const thisApp = this;

    thisApp.activeStep = {
      stepValue: '',
      get changeStep() {
        return this.stepValue;
      },
      set changeStep(step) {
        this.stepValue = step;
        this.changeStepListener(step);
      },
      changeStepListener: function () { },
      registerNewListener: function (externalListenerFunction) {
        this.changeStepListener = externalListenerFunction;
      },
    };
  },

  initGrid: function () {
    const thisApp = this;
    
    thisApp.grid = new Grid();
  },

  initDrawRoutes: function () {
    const thisApp = this;
    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.drawRoutes = new DrawRoutes(finderWrapper, thisApp.grid.grid, thisApp.grid.selectedCells, thisApp.activeStep);
  },

  initStartAndEnd: function () {
    const thisApp = this;

    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.selectStartAndEnd = new SelectStartAndEnd(
      finderWrapper,
      thisApp.grid.grid,
      thisApp.grid.start,
      thisApp.grid.end,
      thisApp.grid.selectedCells,
      thisApp.activeStep);
  },

  initCompute: function () {
    const thisApp = this;

    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.compute = new Compute(
      finderWrapper,
      thisApp.grid.grid,
      thisApp.grid.start,
      thisApp.grid.end,
      thisApp.activeStep,
      thisApp.grid.selectedCells,);
  },

  initStartAgain: function () {
    const thisApp = this;

    const finderWrapper = document.querySelector(select.containerOf.finderWrapper);
    
    thisApp.startAgain = new startAgain(finderWrapper);
  },

  init: function () {
    const thisApp = this;

    thisApp.initPages();
    //thisApp.initGrid();
    thisApp.activateNewStep();
  

    thisApp.activeStep.registerNewListener(function () {
      if (thisApp.activeStep.stepValue == 2) {
        thisApp.initStartAndEnd();
      } else if (thisApp.activeStep.stepValue == 3) {
        thisApp.initCompute();
      } else if (thisApp.activeStep.stepValue == 1) {
        delete thisApp.grid;
        //delete thisApp.drawRoutes;
        thisApp.initGrid();
        thisApp.initDrawRoutes();
        console.log(thisApp.drawRoutes);
      }
    });
      
    if (thisApp.navLinks[1].classList.contains(classNames.nav.active)) {
      thisApp.activeStep.changeStep = 1;
      console.log('activ');
    } else {
      thisApp.navLinks[1].addEventListener('click', function () {
        thisApp.activeStep.changeStep = 1;
        console.log('click');
      });
    }

    

    //thisApp.initStartAgain();

  }
};

app.init();