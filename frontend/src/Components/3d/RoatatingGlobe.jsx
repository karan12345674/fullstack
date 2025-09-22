import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function RotatingGlobe({ className = "" }) {
  const mountRef = useRef(null);
  const frameRef = useRef();

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Globe geometry
    const geometry = new THREE.SphereGeometry(1.5, 64, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x00f5ff) },
        color2: { value: new THREE.Color(0x8a2be2) },
      },
      vertexShader: `
        varying vec3 vPosition;
        uniform float time;
        void main() {
          vPosition = position;
          vec3 pos = position;
          pos.x += sin(pos.y * 10.0 + time) * 0.05;
          pos.y += sin(pos.x * 10.0 + time * 1.5) * 0.05;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vPosition;
        void main() {
          float pattern = sin(vPosition.x * 20.0 + time) *
                          sin(vPosition.y * 20.0 + time) *
                          sin(vPosition.z * 20.0 + time);
          vec3 color = mix(color1, color2, pattern * 0.5 + 0.5);
          float alpha = 0.8 + pattern * 0.2;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      wireframe: true,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Particles around globe
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 4;

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      material.uniforms.time.value = time;

      globe.rotation.y += 0.01;
      globe.rotation.x += 0.005;

      particles.rotation.y -= 0.002;
      particles.rotation.x += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Debounced Resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (currentMount) {
          const width = currentMount.clientWidth;
          const height = currentMount.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      particlesGeometry.dispose();
      material.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`${className} mx-auto`}
      style={{
        width: "100%",
        maxWidth: "600px", // Desktop max width
        height: "400px",
      }}
    />
  );
}