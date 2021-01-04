

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_color_spacing;
uniform float u_color_brightness;
uniform float u_color_delta;
uniform float u_color_opacity;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec3 c;
	float l,z=0.1;
	for(int i=0;i<3;i++) {
		vec2 uv,p=gl_FragCoord.xy/u_resolution;
		uv=p;
		p-=.1;
		p.x*=u_resolution.x/u_resolution.y;
		z+= u_color_spacing;
		l=length(p*2.);
		uv+=(sin(z)+l/(abs(cos(u_time)+u_color_delta)));
		c[i]=.01/length(abs(mod(uv,1.)-.5));
	}
	gl_FragColor=vec4(vec3(.04,0.03,0.71) + c/l * u_color_brightness *1./( 0.2 + abs(cos(u_time)+u_color_delta)/2.), 1);
}
