varying vec2 vUv;
//varying vec3 vNormal;
varying float vNoise;

uniform float u_gradiant;
uniform float u_color;
uniform vec3 fogColor;
uniform vec3 lightColor;

//uniform sampler2D shadow;
uniform sampler2D gradient;


void main() {

	vec2 newUV = vUv;
	//newUV.x *= 3.0;
	//newUV.x /= 2.0;
	//newUV.x -= 1.5;
  	//vec4 color = texture2D(shadow, newUV);
  	vec4 color = vec4(u_color);


  	//vec4 c;
	//for(int s = 0; s < 2; s++) {
	//  	c = texture2D(gradient, points[s] * newUV);
	//}
	
	vec3 outgoingLight = texture2D( gradient, vec2(0., 1. - vNoise ) ).rgb;
	//vec3 outgoingLight = vec3( (1.0 - vNoise) ) * lightColor;



	// FOG NEAR CAMERA
								
	float depth = gl_FragCoord.z / gl_FragCoord.w;
	float fogFactor = smoothstep( 0.0, 40.0, depth );

	outgoingLight = outgoingLight / fogFactor;
								

	outgoingLight = mix( mix( outgoingLight, color.rgb, 0.2 ), vec3(u_color), vUv.y );	


	gl_FragColor = vec4( 1. - (outgoingLight) , 1.0 );

}