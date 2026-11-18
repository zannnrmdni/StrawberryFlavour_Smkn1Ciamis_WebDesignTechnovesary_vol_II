/**
 * Potongan bumi di akhir perjalanan.
 * Bumi dipotong dengan satu bidang clipping: separuh depan dibuang, lalu
 * cincin lapisan digambar tepat di bidang potong. Kalau WebGL gagal atau
 * pengguna meminta gerak dikurangi, gambar SVG statis tetap tampil.
 */
import * as THREE from 'three';

const stage = document.querySelector('[data-cutaway]');
const canvas = document.querySelector('[data-cutaway-canvas]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const COLORS = {
  mantle: '#F26A55',
  clay: '#DE7A45',
  rock: '#557187',
  crust: '#A9423A',
  ink: '#16262B',
};

if (stage && canvas) {
  if (reducedMotion.matches) {
    stage.classList.add('is-static');
  } else {
    start();
  }
}

function start() {
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    fail();
    return;
  }

  if (!renderer.getContext()) {
    fail();
    return;
  }

  let raf = 0;
  let disposed = false;
  let visible = true;
  let running = true;
  let ready = false;
  let lastTime = 0;
  let spinVelocity = 0;
  let dragging = false;
  let pointerX = 0;

  const clock = new THREE.Clock();

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.localClippingEnabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0, 0.16, 3.25);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 1.55));

  const sun = new THREE.DirectionalLight(0xfff0d2, 3.1);
  sun.position.set(2.4, 2.1, 3.4);
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0x8fc7dd, 1.1);
  fill.position.set(-3.2, -0.8, 1.4);
  scene.add(fill);

  // Bidang potong: semua yang berada di depan (z > 0) dibuang.
  const cutPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

  const world = new THREE.Group();
  world.rotation.y = -0.12;
  scene.add(world);

  const globeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.94,
    metalness: 0,
    clippingPlanes: [cutPlane],
    clipShadows: false,
  });

  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    globeMaterial
  );
  world.add(globe);

  // Dinding dalam bola, supaya rongga potongan tidak terlihat kosong.
  const inner = new THREE.Mesh(
    new THREE.SphereGeometry(0.985, 64, 48),
    new THREE.MeshStandardMaterial({
      color: 0x7b3f33,
      roughness: 1,
      metalness: 0,
      side: THREE.BackSide,
      clippingPlanes: [cutPlane],
    })
  );
  world.add(inner);

  // Cincin konsentris di bidang potong, dari mantel sampai kerak tipis.
  const face = new THREE.Group();
  face.position.z = 0.003;
  world.add(face);

  const disc = (radius, color, z) => {
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 128),
      new THREE.MeshBasicMaterial({ color, toneMapped: false })
    );
    mesh.position.z = z;
    face.add(mesh);
    return mesh;
  };

  const band = (innerRadius, outerRadius, color, z) => {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(innerRadius, outerRadius, 160),
      new THREE.MeshBasicMaterial({ color, toneMapped: false })
    );
    mesh.position.z = z;
    face.add(mesh);
    return mesh;
  };

  disc(0.998, COLORS.mantle, 0);
  band(0.80, 0.94, COLORS.clay, 0.002);
  band(0.94, 0.985, COLORS.rock, 0.004);
  band(0.985, 0.998, COLORS.crust, 0.006);

  // Garis tipis untuk batas lapisan dan lingkaran Moho.
  const stroke = (radius, color, width, z) => {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(radius - width, radius + width, 160),
      new THREE.MeshBasicMaterial({ color, toneMapped: false })
    );
    mesh.position.z = z;
    face.add(mesh);
  };

  stroke(0.998, COLORS.ink, 0.0022, 0.012);
  stroke(0.985, COLORS.ink, 0.0014, 0.012);
  stroke(0.94, COLORS.ink, 0.0014, 0.012);

  const mohoPoints = [];
  const mohoRadius = 0.94;
  for (let i = 0; i <= 180; i += 1) {
    const angle = (i / 180) * Math.PI * 2;
    mohoPoints.push(new THREE.Vector3(
      Math.cos(angle) * mohoRadius,
      Math.sin(angle) * mohoRadius,
      0.014
    ));
  }
  const moho = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(mohoPoints),
    new THREE.LineDashedMaterial({
      color: COLORS.ink,
      dashSize: 0.022,
      gapSize: 0.018,
      transparent: true,
      opacity: 0.7,
    })
  );
  moho.computeLineDistances();
  face.add(moho);

  const resize = () => {
    const width = canvas.clientWidth || stage.clientWidth || 1;
    const height = canvas.clientHeight || stage.clientHeight || 1;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();

  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(stage);
  } else {
    window.addEventListener('resize', resize, { passive: true });
  }

  const textureLoader = new THREE.TextureLoader();
  const textureUrl = canvas.dataset.textureHi || canvas.dataset.textureLo || '';

  const settle = (texture) => {
    if (disposed || !texture) {
      fail();
      return;
    }
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    globeMaterial.map = texture;
    globeMaterial.needsUpdate = true;
    ready = true;
    stage.classList.add('is-live');
    stage.classList.remove('is-static');
    clock.start();
    raf = requestAnimationFrame(frame);
  };

  const fail = () => {
    cancelAnimationFrame(raf);
    stage.classList.remove('is-live');
    stage.classList.add('is-static');
    renderer.dispose();
    disposed = true;
  };

  if (textureUrl !== '') {
    textureLoader.load(textureUrl, settle, undefined, fail);
  } else {
    fail();
  }

  const onPointerDown = (event) => {
    dragging = true;
    pointerX = event.clientX;
    spinVelocity = 0;
    canvas.setPointerCapture?.(event.pointerId);
    canvas.classList.add('is-dragging');
  };

  const onPointerMove = (event) => {
    if (!dragging) return;
    const dx = event.clientX - pointerX;
    pointerX = event.clientX;
    globe.rotation.y += dx * 0.006;
    inner.rotation.y += dx * 0.006;
    spinVelocity = dx * 0.0024;
  };

  const onPointerUp = (event) => {
    dragging = false;
    canvas.releasePointerCapture?.(event.pointerId);
    canvas.classList.remove('is-dragging');
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    fail();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '120px', threshold: 0 }
    ).observe(stage);
  }

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) clock.getDelta();
  });

  const frame = (time) => {
    raf = requestAnimationFrame(frame);
    if (!ready || !running || !visible || disposed) return;
    if (time - lastTime < 1000 / 40) return;
    lastTime = time;

    const delta = Math.min(clock.getDelta(), 0.05);

    if (!dragging) {
      globe.rotation.y += (0.075 + spinVelocity) * delta;
      inner.rotation.y += (0.075 + spinVelocity) * delta;
      spinVelocity *= 0.95;
    }

    world.position.y = Math.sin(time * 0.00042) * 0.014;

    renderer.render(scene, camera);
  };
}
