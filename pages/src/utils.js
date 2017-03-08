function getByAttr(oParent, attrName, attrVal) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var re = new RegExp('\\b' + attrVal + '\\b', 'i');
    var i = 0;

    for (i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].getAttribute(attrName))) {
            aResult.push(aEle[i]);
        }
    }

    return aResult;
}

/**
 * Check if an object is a html element
 * @param {Object} element 
 */
function isElement(element){
  if(element && element instanceof HTMLElement){
    return true;
  }
  return false;
}

/**
 * Add event listener to element
 * @param {HTMLElement} element 
 * @param {String} eType 
 * @param {Function} listener 
 * @param {Boolean} useCapture 
 * 
 * @return {Function} added listener function
 */
function addListener(element, eType, listener, useCapture){
  if(!isElement(element) && element !== document){
    throw new Error('No element provided');
  } 

  var wrapperListener = function(){
    var event = arguments[0] || window.event;
    listener(event);
  };

  if(element.addEventListener){
    element.addEventListener(eType, wrapperListener, useCapture);
  }else{
    element.attach('on' + eType, wrapperListener)
  }
  return wrapperListener;
}

/**
 * Remove event listener from element
 * @param {HTMLElement} element 
 * @param {String} eType 
 * @param {Function} listener 
 * 
 * @return {void}
 */
function removeListener(element, eType, listener){
  if(!isElement(element) && element !== document){
    throw new Error('No element provided');
  } 
  if(element.removeEventListener){
    element.removeEventListener(eType, listener);
  }else{
    element.detachEvent('on' + eType, listener);
  }
  return;
}

/*
 * Disable text selection when double click or drag cursor
 * @dom html element
 */
function disableTextSelection(dom){
  return addListener(dom, 'mousedown', function(event){
    event.stopPropagation && event.stopPropagation();
    event.preventDefault && event.preventDefault();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
  })
}

/**
 * Add class to html element
 */
function addClassToElement(element){
  if(!isElement(element)){
    throw new Error('Not a valid html element');
  }
  var classes = [];
  if(arguments.length > 1){
    classes = Array.prototype.slice.call(arguments, 1);
  }
  var current = element.getAttribute('class');
  classes.unshift(current);
  element.setAttribute('class', classes.join(' '));
}

/**
 * Remove class from html element
 */
function removeClassFromElement(element){
  if(!isElement(element)){
    throw new Error('Not a valid html element');
  }
  var classes = [];
  if(arguments.length > 1){
    classes = Array.prototype.slice.call(arguments, 1);
  }
  var current = element.getAttribute('class').split(' ');
  var last = current.filter(function(name){
    return classes.indexOf(name) === -1;
  })
  element.setAttribute('class', last.join(' '));
}