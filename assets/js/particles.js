(function () {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const renderer = new OGL.Renderer({ dpr: 2, alpha: true });
  const gl = renderer.gl;
  container.appendChild(gl.canvas);
  gl.clearColor(0, 0, 0, 0);

  const camera = new OGL.Camera(gl, { fov: 15 });
  camera.position.set(0, 0, 20);

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
  }
  window.addEventListener('resize', resize);
  resize();

  const vertex = `
    attribute vec3 position;
    attribute vec4 random;
    attribute vec3 color;
    uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
    uniform float uTime;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec3 pos = position * 10.0;
      pos.x += sin(uTime + random.x * 6.28) * 0.5;
      pos.y += cos(uTime + random.y * 6.28) * 0.5;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
      gl_PointSize = 3.0;
    }`;

  const fragment = `
    precision highp float;
    varying vec3 vColor;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      if(d > 0.5) discard;
      gl_FragColor = vec4(vColor, 1.0);
    }`;

  const count = 200;
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count * 4);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions.set([(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2], i * 3);
    randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    colors.set([1, 1, 1], i * 3); // white particles
  }

  const geometry = new OGL.Geometry(gl, {
    position: { size: 3, data: positions },
    random: { size: 4, data: randoms },
    color: { size: 3, data: colors }
  });

  const program = new OGL.Program(gl, {
    vertex,
    fragment,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    depthTest: false
  });

  const particles = new OGL.Mesh(gl, { mode: gl.POINTS, geometry, program });

  let last = performance.now();
  function update(t) {
    requestAnimationFrame(update);
    const delta = t - last;
    last = t;
    program.uniforms.uTime.value += delta * 0.001;
    renderer.render({ scene: particles, camera });
  }
  requestAnimationFrame(update);
})();
