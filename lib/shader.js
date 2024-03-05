const  name = 'shader';
const fragShader = `

precision mediump float;

uniform sampler2D uMainSampler;
uniform float time;
varying vec2 outTexCoord;

void main()
{
    vec2 uv = outTexCoord;

uv.y+=cos(uv.x*3.0*time*3.0)*0.01;
    vec4 texColor = texture2D(uMainSampler, uv);
    gl_FragColor = texColor;
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
        
        });
    }
        onPreRender ()
    {
        this.setTime('time');
    }
      
      
      
  
     
    }
  
  