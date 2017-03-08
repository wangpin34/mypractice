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


function addListener(element, eType, listener, useCapture){
  // if(!element) throw new Error('No element provided');

  if(element.addEventListener){
    element.addEventListener(eType, listener);
  }else{
    element.attach('on' + eType, listener)
  }
}

function removeListener(element, eType, listener){
  // if(!isElement(element)){
  //    throw new Error('Not a valid html element');
  // }
  if(element.removeEventListener){
    element.removeEventListener(eType, listener);
  }else{
    element.detachEvent('on' + eType, listener);
  }
}

/*
 * Disable text selection when double click or drag cursor
 * @dom html element
 */
function disableTextSelection(dom){
  if(dom.addEventListener){
    dom.addEventListener('mousedown', function(event){
      event.stopPropagation();
      event.preventDefault();    
    })
  }else{
    dom.attach('onmousedown', function(){
      var event = window.event;
      event.cancelBubble = true;
      event.returnValue = false;
      return false;
    })
  }
}

/**
 * Check if element is a html element
 * @param {*} element 
 */
function isElement(element){
  if(element && element instanceof HTMLElement){
    return true;
  }
  return false;
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