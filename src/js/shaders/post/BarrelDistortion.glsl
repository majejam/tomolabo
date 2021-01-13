//uniform sampler2D inputBuffer;
uniform float u_k1;
uniform float u_k2;
vec2 brownConradyDistortion(vec2 uv)
{
    // positive values of K1 give barrel distortion, negative give pincushion
    float barrelDistortion1 = u_k1; // K1 in text books
    float barrelDistortion2 = u_k2; // K2 in text books
    float r2 = uv.x*uv.x + uv.y*uv.y;
    uv *= 1.0 + barrelDistortion1 * r2 + barrelDistortion2 * r2 * r2;
    
    // tangential distortion (due to off center lens elements)
    // is not modeled in this function, but if it was, the terms would go here
    return uv;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

    vec2 uvTemp = uv;
    uvTemp.y = uvTemp.y;
    uvTemp = uvTemp * 2.0 - 1.0;

    uvTemp = brownConradyDistortion(uvTemp);

    uvTemp = 0.5 * (uvTemp * 0.5 + 1.0);

    
	
    vec3 col;
    col.r = texture( inputBuffer, vec2(uvTemp.x+0.0005 ,uvTemp.y) ).r;
    col.g = texture( inputBuffer, vec2(uvTemp.x,uvTemp.y) ).g;
    col.b = texture( inputBuffer, vec2(uvTemp.x-0.0005,uvTemp.y) ).b;


    outputColor = vec4(col,1.0) ;

    //outputColor = texture(inputBuffer, uvTemp);
}
