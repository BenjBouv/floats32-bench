/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    if (typeof Float32Array === 'undefined') {
        throw new Error('Float32Array are necessary for the Float32 support!');
    }
    var GLMAT_ARRAY_TYPE = Float32Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

Math.fround = Math.fround || function(x) {return x;}

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name f32mat3
 */
var f32mat3 = {};

/**
 * Creates a new identity f32mat3
 *
 * @returns {f32mat3} a new 3x3 matrix
 */
f32mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

f32mat3.random = function(out) {
    for (var i = 0; i < 9; ++i) {
        out[i] = GLMAT_RANDOM();
    }
    return out;
}

/**
 * Copies the upper-left 3x3 values into the given f32mat3.
 *
 * @param {f32mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {f32mat3} out
 */
f32mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new f32mat3 initialized with values from an existing matrix
 *
 * @param {f32mat3} a matrix to clone
 * @returns {f32mat3} a new 3x3 matrix
 */
f32mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one f32mat3 to another
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the source matrix
 * @returns {f32mat3} out
 */
f32mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a f32mat3 to the identity matrix
 *
 * @param {f32mat3} out the receiving matrix
 * @returns {f32mat3} out
 */
f32mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a f32mat3
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the source matrix
 * @returns {f32mat3} out
 */
f32mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a f32mat3
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the source matrix
 * @returns {f32mat3} out
 */
f32mat3.invert = function(out, a) {
    var f32 = Math.fround;
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = f32(f32(a22 * a11) - f32(a12 * a21)),
        b11 = f32(f32(f32(-a22) * a10) + f32(a12 * a20)),
        b21 = f32(f32(a21 * a10) - f32(a11 * a20)),

        // Calculate the determinant
        det = f32(f32(f32(a00 * b01) + f32(a01 * b11)) + f32(a02 * b21));

    if (!f32(det)) {
        return null;
    }
    det = f32(1.0 / det);

    out[0] = b01 * det;
    out[1] = f32(f32(f32(-a22) * a01) + f32(a02 * a21)) * det;
    out[2] = f32(f32(a12 * a01) - f32(a02 * a11)) * det;
    out[3] = b11 * det;
    out[4] = f32(f32(a22 * a00) - f32(a02 * a20)) * det;
    out[5] = f32(f32(f32(-a12) * a00) + f32(a02 * a10)) * det;
    out[6] = b21 * det;
    out[7] = f32(f32(f32(-a21) * a00) + f32(a01 * a20)) * det;
    out[8] = f32(f32(a11 * a00) - f32(a01 * a10)) * det;
    return out;
};

/**
 * Calculates the adjugate of a f32mat3
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the source matrix
 * @returns {f32mat3} out
 */
/* NOT SPECIALIZED */
/*
f32mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};
*/

/**
 * Calculates the determinant of a f32mat3
 *
 * @param {f32mat3} a the source matrix
 * @returns {Number} determinant of a
 */
f32mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return Math.fround(Math.fround(Math.fround(a00 * Math.fround(Math.fround(a22 * a11) - Math.fround(a12 * a21))) + Math.fround(a01 * (Math.fround(Math.fround(Math.fround(-a22) * a10) + Math.fround(a12 * a20))))) + Math.fround(a02 * Math.fround(Math.fround(a21 * a10) - Math.fround(a11 * a20))));
};

/**
 * Multiplies two f32mat3's
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the first operand
 * @param {f32mat3} b the second operand
 * @returns {f32mat3} out
 */
f32mat3.multiply = function (out, a, b) {
    var f32 = Math.fround;
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = f32(f32(b00 * a00) + f32(b01 * a10)) + f32(b02 * a20);
    out[1] = f32(f32(b00 * a01) + f32(b01 * a11)) + f32(b02 * a21);
    out[2] = f32(f32(b00 * a02) + f32(b01 * a12)) + f32(b02 * a22);

    out[3] = f32(f32(b10 * a00) + f32(b11 * a10)) + f32(b12 * a20);
    out[4] = f32(f32(b10 * a01) + f32(b11 * a11)) + f32(b12 * a21);
    out[5] = f32(f32(b10 * a02) + f32(b11 * a12)) + f32(b12 * a22);

    out[6] = f32(f32(b20 * a00) + f32(b21 * a10)) + f32(b22 * a20);
    out[7] = f32(f32(b20 * a01) + f32(b21 * a11)) + f32(b22 * a21);
    out[8] = f32(f32(b20 * a02) + f32(b21 * a12)) + f32(b22 * a22);
    return out;
};

/**
 * Alias for {@link f32mat3.multiply}
 * @function
 */
f32mat3.mul = f32mat3.multiply;

/**
 * Translate a f32mat3 by the given vector
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {f32mat3} out
 */
f32mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = Math.fround(Math.fround(x * a00) + Math.fround(y * a10)) + a20;
    out[7] = Math.fround(Math.fround(x * a01) + Math.fround(y * a11)) + a21;
    out[8] = Math.fround(Math.fround(x * a02) + Math.fround(y * a12)) + a22;
    return out;
};

/**
 * Rotates a f32mat3 by the given angle
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {f32mat3} out
 */
f32mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        rad = Math.fround(rad),
        s = Math.fround(Math.sin(rad)),
        c = Math.fround(Math.cos(rad));

    out[0] = Math.fround(c * a00) + Math.fround(s * a10);
    out[1] = Math.fround(c * a01) + Math.fround(s * a11);
    out[2] = Math.fround(c * a02) + Math.fround(s * a12);

    out[3] = Math.fround(c * a10) - Math.fround(s * a00);
    out[4] = Math.fround(c * a11) - Math.fround(s * a01);
    out[5] = Math.fround(c * a12) - Math.fround(s * a02);

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the f32mat3 by the dimensions in the given vec2
 *
 * @param {f32mat3} out the receiving matrix
 * @param {f32mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {f32mat3} out
 **/
f32mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a f32mat3
 *
 * @param {f32mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {f32mat3} out
 **/
f32mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {f32mat3} out f32mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {f32mat3} out
*/
/* NOT SPECIALIZED */
/*
f32mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[3] = xy + wz;
    out[6] = xz - wy;

    out[1] = xy - wz;
    out[4] = 1 - (xx + zz);
    out[7] = yz + wx;

    out[2] = xz + wy;
    out[5] = yz - wx;
    out[8] = 1 - (xx + yy);

    return out;
};
*/

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {f32mat3} out f32mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {f32mat3} out
*/
/* NOT SPECIALIZED */
/*
f32mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};
*/

/**
 * Returns a string representation of a f32mat3
 *
 * @param {f32mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
f32mat3.str = function (a) {
    return 'f32mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

