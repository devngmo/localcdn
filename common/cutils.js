console.log('cutils::init');

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

function replaceAll(str, replaceWhat, replaceTo){
    var re = new RegExp(replaceWhat, 'g');
    return str.replace(re,replaceTo);
}

function safeSplitString(str, delimiter) {
    if (str === undefined || str === null) return [];
    var trimmed = str.trim();
    if (trimmed.length === 0) return [];
    return trimmed.split(delimiter);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBool() {
    var min = 0;
    var max = 100;
    var n = Math.floor(Math.random() * (max - min + 1));
    return n > 50;
}

function lerp(min, max, t) {
    var d = max-min;
    if (d < 0) d = 0;
    return min + Math.floor( t * d );
}

function max(a, b) {
    return a > b? a:b;
}

function min(a, b) {
    return a < b? a:b;
}

function cloneDict(src, dst) {
    Object.keys(src).forEach(function(key) {
        dst[ key ] = src[ key ];
    });
}

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

/////////////////////////////////////
/// COMPATTIBLE FIXES
/////////////////////////////////////

// select2 on bootstrap4
$.fn.modal.Constructor.prototype._enforceFocus = function() {};

function getEntityPrimaryKey(ent) {
    if (ent === null || ent === undefined) return null;
    if (ent.props === null || ent.props === undefined) return null;
    
    for (let index = 0; index < ent.props.length; index++) {
        const prop = ent.props[index];
        if (prop.type === 'autonum') {
            return { 
            name: prop.name, 
            type: prop.type,
            refType: 'int'
            };
        }
        else if (prop.type === 'autonum_big') {
            return { 
            name: prop.name, 
            type: prop.type,
            refType: 'bigint'
            };
        }
        else if (prop.key === 'primary') {
            var refType = prop.type;
            return { 
            name: prop.name, 
            type: type,
            refType: refType
            };
        }
    }
}

function compileRefs(entities) {
    var entMap = [];
    entities.map(function(e){
        entMap[e.id] = e;
    });

    entities.map(function(ent){
        ent.props.map(function(p){
            if (p.type.startsWith('@ent:')) {
                if (p.refType === undefined) {
                    var refEntID = p.type.substring(5);
                    var refEnt = entMap[refEntID];
                    var refEntKey = getEntityPrimaryKey(refEnt);
                    if (refEntKey === null) return;
                    //console.log(`foreign key: ${refEntID}.${refEntKey.name} ${refEntKey.type} `);
                    p.refType = refEntKey.refType;
                }
            }
        });
    });
}


function copyProps(fromA, toB, copyAll = false) {
	if (copyAll) {
		Object.keys(fromA).map(key => {
			toB[key] = fromA[key];
		});
	}
	else {
		Object.keys(toB).map(key => {
			if (fromA[key] !== undefined)
				toB[key] = fromA[key];
		});
	}
}


function JsonSearchModel(parent, key, value, recursive=false, limit=1, founds = []) {
    
    if (parent === null || parent === undefined) return founds;
    if (typeof parent !== 'object') return founds;
    
    if (Array.isArray(parent)) {
        for(let i = 0; i < parent.length; i++) {
            JsonSearchModel(parent[i], key, value, recursive, limit, founds);
        }
        return founds;
    }
    
    if (parent[key] === value) {
        founds.push(parent);
        if (founds.length === limit) return founds;
    }
    if (!recursive) return founds;
    
    let keys = Object.keys(parent);
    for(let i = 0; i < keys.length; i++) {
        JsonSearchModel(parent[keys[i]], key, value, recursive, limit, founds);
    }
    return founds;
}

function JsonSearchIndex(array, key, value) {
    for(let i = 0; i < array.length; i++) {
        let item = array[i];
        if (item[key] === value) return i;
    }
    return -1;
}


function JsonGet(model, key, defaultValue) {
    if (typeof model[key] === undefined) return defaultValue;
    return model[key];
}



function getSinceTime(timepoint) {
	var now = moment();
	var diff = moment.duration(now.diff(timepoint));
	let secs = diff._milliseconds / 1000;

	return diff.humanize() + ' ago';
}

function combineURL(a, b) {
	if (a.endsWith('/')) {
		if (b.startsWith('/')) {
			if (b.length > 1)
				return a + b.substring(1);
			return a;
		}
		return a + b;
	}
	else {
		if (b.startsWith('/')) {
			return a + b;
		}
		return a + '/' + b;
	}
}