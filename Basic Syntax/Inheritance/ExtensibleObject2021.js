function extensibleObject() {
    // let extObj2 = {name : 'a'};
    // console.log(extObj2.hasOwnProperty('name'));
    // console.log(Object.prototype === Object.getPrototypeOf(extObj2));
    // let extensibleObj = {};
    // let obj = new Object();

    let proto = {};
    let extObj = Object.create(proto);
    extObj.extend = function (template) {
        for (let key in template) {
            if (typeof template[key] === 'function') {
                let proto = Object.getPrototypeOf(this);
                proto[key] = template[key];
            } else {
                this[key] = template[key];
            }
        }
    }

    return extObj;
}

let myObj = extensibleObject();

const template = {
    extensionMethod: function () { },
    extensionProperty: 'someString'
};

myObj.extend(template); 

console.log(myObj);