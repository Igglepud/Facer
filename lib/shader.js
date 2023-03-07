const  name = 'shader';
const fragShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = (gl_FragCoord.xy/u_resolution.xy*cos(u_time));

    float rnd = random( st );

    gl_FragColor = vec4(vec3(rnd),1.0);
}
`;

export class myShader extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
    constructor(game) {
     
      super({
        game,
        fragShader,
        uniforms:[
          'uProjectionMatrix',
          'uMainSampler',
          'uTime',
          'uResolution',
  
  
        ]
        
        });}
      
  
     
    }
  
  