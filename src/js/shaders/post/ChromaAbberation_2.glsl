uniform float u_force;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float amount = 0.0;
	
	amount = (1.0 + sin(time*6.0)) * 0.5;
	amount *= 1.0 + sin(time*16.0) * 0.1;
	amount *= 1.0 + sin(time*19.0) * 0.1;
	amount *= 1.0 + sin(time*27.0) * 0.2;
	amount = pow(amount, 3.0);

	amount *= 0.005 + (u_force/100.);
	
    vec3 col;
    col.r = texture( inputBuffer, vec2(uv.x+amount,uv.y*(1. + amount)) ).r;
    col.g = texture( inputBuffer, vec2(uv.x,uv.y) ).g;
    col.b = texture( inputBuffer, vec2(uv.x-amount,uv.y*(1. + amount)) ).b;

	col *= (1.0 - amount * 0.5);

    outputColor = vec4(col,1.0) ;
}