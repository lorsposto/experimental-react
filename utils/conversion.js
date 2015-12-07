var Conversion = function() {};

Conversion.GPEROZ = 28.3495231;
Conversion.MLPERFLOZ = 29.5735296;

Conversion.prototype.gToOz = function (grams) {
    return (grams / Conversion.GPEROZ);
};

Conversion.prototype.ozToG = function (ounces) {
    return (ounces * Conversion.GPEROZ);
};

Conversion.prototype.mlToFlOz = function (mls) {
    return (mls / Conversion.MLPERFLOZ);
};

Conversion.prototype.flOzToMl = function (mls) {
    return (mls * Conversion.MLPERFLOZ);
};

module.exports = new Conversion();