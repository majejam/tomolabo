uniform float u_offset;
uniform float u_darkness;

void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){
    const vec2 center=vec2(0.5);
    vec3 color=inputColor.rgb;
    float d=distance(uv,center);
    color*=smoothstep(0.8,u_offset,d*(u_darkness+u_offset));
    outputColor=vec4(color,inputColor.a);
}