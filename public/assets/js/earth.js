/**
 * Bumi 3D di pembuka.
 * Tugasnya cuma tiga: menjadi bumi yang bisa diputar, mengecilkan jarak kamera
 * saat digulir, lalu menyerahkan layar ke perjalanan bawah tanah.
 */
import * as THREE from 'three';

const orbit = document.querySelector('[data-orbit]');
const canvas = document.querySelector('[data-earth-canvas]');
const copy = document.querySelector('[data-orbit-copy]');
const arrival = document.querySelector('[data-arrival]');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const smallScreen = window.matchMedia('(max-width: 819px)');

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (from, to, value) => {
  const t = clamp((value - from) / (to - from), 0, 1);
  return t * t * (3 - 2 * t);
};

const goStatic = () => {
  orbit?.classList.add('is-static');
};

if (orbit && canvas) {
  if (reducedMotion.matches) {
    goStatic();
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
      antialias: !smallScreen.matches,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    goStatic();
    return;
  }

  if (!renderer.getContext()) {
    goStatic();
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0, 3.7);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, smallScreen.matches ? 48 : 72, smallScreen.matches ? 32 : 48),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.94, metalness: 0 })
  );
  scene.add(earth);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.006, smallScreen.matches ? 40 : 64, smallScreen.matches ? 28 : 40),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.34, depthWrite: false })
  );
  scene.add(clouds);

  const sunlight = new THREE.DirectionalLight(0xfff1d8, 2.35);
  sunlight.position.set(1.9, 1.35, 3.15);
  scene.add(sunlight);

  const fill = new THREE.DirectionalLight(0x7fb5c9, 0.5);
  fill.position.set(-3, -1, 0.8);
  scene.add(fill);

  scene.add(new THREE.AmbientLight(0xffffff, 0.22));

  let targetProgress = 0;
  let progress = 0;
  let pointerDown = false;
  let pointerX = 0;
  let pointerY = 0;
  let spinVelocity = 0;
  let running = true;
  let visible = true;
  let ready = false;
  let lastFrame = 0;
  let raf = 0;
  const clock = new THREE.Clock();

  const textureLoader = new THREE.TextureLoader();
  let pending = 2;

  const settle = () => {
    pending -= 1;
    if (pending > 0) return;

    ready = true;
    orbit.classList.add('is-live');
    clock.start();
    raf = requestAnimationFrame(frame);
  };

  const fail = () => {
    cancelAnimationFrame(raf);
    goStatic();
  };

  const loadTexture = (url, onLoad) => {
    textureLoader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        onLoad(texture);
        settle();
      },
      undefined,
      fail
    );
  };

  loadTexture(
    smallScreen.matches
      ? canvas.dataset.textureLo || canvas.dataset.textureHi
      : canvas.dataset.textureHi || canvas.dataset.textureLo,
    (texture) => {
      earth.material.map = texture;
      earth.material.needsUpdate = true;
    }
  );

  loadTexture(canvas.dataset.textureClouds, (texture) => {
    clouds.material.map = texture;
    clouds.material.needsUpdate = true;
  });

  const baseOffset = () => (smallScreen.matches ? 0.24 : 0.62);

  const resize = () => {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, smallScreen.matches ? 1.5 : 2);

    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const readProgress = () => {
    const rect = orbit.getBoundingClientRect();
    const scrollable = Math.max(1, orbit.offsetHeight - window.innerHeight);
    return clamp(-rect.top / scrollable, 0, 1);
  };

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.create({
      trigger: orbit,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });
    targetProgress = readProgress();
  } else {
    targetProgress = readProgress();
    window.addEventListener(
      'scroll',
      () => {
        targetProgress = readProgress();
      },
      { passive: true }
    );
  }

  const onPointerDown = (event) => {
    pointerDown = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
    spinVelocity = 0;
    canvas.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!pointerDown) return;
    const dx = event.clientX - pointerX;
    const dy = event.clientY - pointerY;
    pointerX = event.clientX;
    pointerY = event.clientY;
    earth.rotation.y += dx * 0.005;
    clouds.rotation.y += dx * 0.005;
    earth.rotation.x = clamp(earth.rotation.x + dy * 0.002, -0.32, 0.32);
    clouds.rotation.x = earth.rotation.x;
    spinVelocity = dx * 0.0038;
  };

  const onPointerUp = (event) => {
    pointerDown = false;
    canvas.releasePointerCapture?.(event.pointerId);
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('pointerleave', onPointerUp);

  const onContextLost = (event) => {
    event.preventDefault();
    fail();
  };
  canvas.addEventListener('webglcontextlost', onContextLost);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    ).observe(orbit);
  }

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) clock.getDelta();
  });

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    if (!ready || !running || !visible) {
      lastFrame = now;
      return;
    }

    if (smallScreen.matches && now - lastFrame < 1000 / 30) return;
    lastFrame = now;

    const delta = Math.min(clock.getDelta(), 0.05);

    progress += (targetProgress - progress) * Math.min(1, delta * 6.5);

    const eased = progress * progress * (3 - 2 * progress);
    camera.position.z = 3.7 - eased * 2.62;
    earth.position.x = baseOffset() * (1 - eased * 0.85);
    clouds.position.x = earth.position.x;

    if (!pointerDown) {
      const drift = 0.045 + (1 - eased) * 0.012;
      earth.rotation.y += (drift + spinVelocity) * delta;
      clouds.rotation.y += (drift * 1.08 + spinVelocity) * delta;
      spinVelocity *= 0.94;
    }

    clouds.rotation.y += delta * 0.004;

    if (copy) {
      const fade = 1 - smoothstep(0.04, 0.34, progress);
      copy.style.opacity = String(fade);
      copy.style.pointerEvents = fade < 0.15 ? 'none' : '';
      copy.inert = fade < 0.15;
    }

    if (arrival) {
      const show = smoothstep(0.82, 0.96, progress);
      arrival.style.opacity = String(show);
      arrival.style.visibility = show > 0.01 ? 'visible' : 'hidden';
      arrival.setAttribute('aria-hidden', show > 0.5 ? 'false' : 'true');
    }

    renderer.render(scene, camera);
  };
}
