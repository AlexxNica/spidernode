// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 15.4.4.22-9-c-i-20
description: >
    Array.prototype.reduceRight - element to be retrieved is own
    accessor property without a get function that overrides an
    inherited accessor property on an Array
---*/

        var testResult = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 1) {
                testResult = (typeof curVal === "undefined");
            }
        }

            Array.prototype[1] = 1;
            var arr = [0, ,2];
            Object.defineProperty(arr, "1", {
                set: function () { },
                configurable: true
            });

            arr.reduceRight(callbackfn, "initialValue");

assert(testResult, 'testResult !== true');

reportCompare(0, 0);
