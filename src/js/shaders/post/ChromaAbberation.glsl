uniform float u_force;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 texel = 1.0 / resolution.xy;
    
    vec2 coords = (uv - 0.5) * 2.0;
    float coordDot = dot (coords, coords);
    
    vec2 precompute = u_force * 10. * coordDot * coords;
    vec2 uvR = uv - texel.xy * precompute;
    vec2 uvB = uv + texel.xy * precompute;
    
    vec4 color;
    color.r = texture(inputBuffer, uvR).r;
    color.g = texture(inputBuffer, uv).g;
    color.b = texture(inputBuffer, uvB).b;
    color.a = 1.;
    outputColor = color ;
}
