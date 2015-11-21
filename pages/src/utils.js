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
