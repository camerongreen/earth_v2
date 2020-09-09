/**
 * Declares classes used to represent animals
 * @type {*}
 */
var org = org || {};
org.camerongreen = org.camerongreen || {};

(function() {
    "use var strict";

    org.camerongreen.AnimalAbstract = function(name, fao_name, weight_consumed, unit) {
        this.name = name;
        this.fao_name = fao_name;
        this.weight_consumed = weight_consumed;
        this.unit = unit;
    };

    org.camerongreen.AnimalAbstract.prototype = {
        setName: function(name) {
            this.name = name;
        },
        getName: function() {
            return this.name;
        },
        setFaoName: function(fao_name) {
            this.fao_name = fao_name;
        },
        getFaoName: function() {
            return this.fao_name;
        },
        setUnit: function(unit) {
            this.unit = unit;
        },
        getUnit: function() {
            return this.unit;
        },
        setWeightConsumed: function(weight_consumed) {
            this.weight_consumed = weight_consumed;
        },
        getWeightConsumed: function() {
            return this.weight_consumed;
        },
        calculateIndividuals: function(total) {
           return Math.ceil(total / this.weight_consumed);
        }
    };


    // Animal Class
    org.camerongreen.Animal = function(name, fao_name, weight_consumed, unit, id) {
        org.camerongreen.AnimalAbstract.call(this, name, fao_name, weight_consumed, unit);
        this.id = id; // short unique identifier used in code, for images html etc
    };

    inherit(org.camerongreen.AnimalAbstract, org.camerongreen.Animal);

    org.camerongreen.Animal.prototype.setId = function(id) {
        this.id = id;
    };
    org.camerongreen.Animal.prototype.getId = function() {
        return this.id;
    };
    org.camerongreen.Animal.prototype.getImage = function() {
        return this.id + ".png";
    };


    // Animals which are grouped in the FAO consumption statistics
    // but which we have individual production statistics for so we can
    // seperate out into individuals, ie poultry -> chickens, turkeys, geese, ducks
    org.camerongreen.AnimalGroup = function(name, fao_name, subtypes) {
        org.camerongreen.AnimalAbstract.call(this, name, fao_name, null, null);
        this.subtypes = subtypes;
    };

    // yeh yeh...so it's not an is a....
    inherit(org.camerongreen.AnimalAbstract, org.camerongreen.AnimalGroup);

    org.camerongreen.AnimalGroup.prototype.setSubtypes = function(subtypes) {
        this.subtypes = subtypes;
    };
    org.camerongreen.AnimalGroup.prototype.getSubtypes = function() {
        return this.subtypes;
    };

    // ye olde Stefanov inherit function from the web
    function inherit(P, C) {
        function F() {};
        F.prototype = P.prototype;
        C.prototype = new F();
        C.super = P.prototype;
        C.prototype.constructor = C;
    }
}());
