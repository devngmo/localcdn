const TestOutputStream = {
    el : null,
    log: [],
	tag: '',
    outputToElement(id) {
        this.el = id;
    },

    append(msg) {
        this.log.push(msg);
        $(`#${this.el}`).append('<br/>' + msg);
    }
};
function d(msg) {
    TestOutputStream.append(`D\\${TestOutputStream.tag}: ${msg}`);
	console.log(msg);
}

function e(msg) {
    TestOutputStream.append(`<div style="color:red">E\\${TestOutputStream.tag}: ${msg}</div>`);
	console.error(msg);
}

function fail(msg) {
	e(msg);
	throw msg;
}

function assertEquals(actual, expected, msg = null) {
	if (actual === expected) {
		return;
	}
	else {
		if (msg != null)
			fail(msg);
		else 
			fail(`Expected <div style="font-weight: bold;">"${expected}"</div> but actual <div style="font-weight: bold;">"${actual}"</div>`);
	}
}

function pass() {
	TestOutputStream.append(`<div style="color:#0d0">D\\${TestOutputStream.tag}: pass</div>`);
	console.log('pass');
}


const TestSuite = {
    output(elementID) {
        TestOutputStream.outputToElement(elementID);
    },

    run(suite) {
		TestOutputStream.tag = suite.name;
        let keys = Object.keys(suite);
        for (let i = 0; i < keys.length; i++) {
            const fnName = keys[i];
            if (fnName.startsWith('test_')) {
                let fn = suite[fnName];
                d('-------------------------');
                d(`Start ${fnName}()...`);
                fn();
                pass();
            }
        }
    }
};