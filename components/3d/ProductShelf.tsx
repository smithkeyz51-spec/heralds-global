'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshReflectorMaterial, Text, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useCartStore } from '@/lib/cart-store'

function ProductBox({ position, color, accentColor, label, price, brand, onClick }: any) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05
    const t = hovered ? 1.12 : 1
    ref.current.scale.lerp(new THREE.Vector3(t, t, t), 0.1)
    if (hovered) ref.current.rotation.y += 0.015
    else ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, 0.05)
  })

  return (
    <group position={position}>
      <mesh ref={ref} onClick={() => { setClicked(true); onClick(); setTimeout(() => setClicked(false), 300) }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto' }}
        castShadow>
        <boxGeometry args={[1.2, 1.8, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, 0.41]}>
        <planeGeometry args={[1.18, 0.5]} />
        <meshStandardMaterial color={accentColor} metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0.41]}>
        <planeGeometry args={[1.18, 0.8]} />
        <meshStandardMaterial color="#FFFDF7" roughness={0.8} />
      </mesh>
      <Text position={[0, 0.3, 0.42]} fontSize={0.1} color={color} anchorX="center" anchorY="middle" maxWidth={1.1}>
        {brand.toUpperCase()}
      </Text>
      <Text position={[0, -0.05, 0.42]} fontSize={0.08} color="#1A1A1A" anchorX="center" anchorY="middle" maxWidth={1.0}>
        {label}
      </Text>
      <Text position={[0, -0.3, 0.42]} fontSize={0.09} color={accentColor === '#FFFDF7' ? '#1A1A1A' : accentColor} anchorX="center" anchorY="middle">
        {price}
      </Text>
    </group>
  )
}

function Scene({ products }: { products: any[] }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial blur={[400, 100]} resolution={512} mixBlur={1} mixStrength={30} roughness={1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4} color="#0a0a0a" metalness={0.5} mirror={0} />
      </mesh>
      <mesh position={[0, -1.4, -0.5]}>
        <boxGeometry args={[products.length * 1.8, 0.08, 0.6]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
      </mesh>
      {products.map((p, i) => {
        const x = (i - (products.length - 1) / 2) * 1.8
        return (
          <Float key={p.id} speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <ProductBox position={[x, -0.5, 0]} {...p} />
          </Float>
        )
      })}
    </>
  )
}

export default function ProductShelf({ products, height = 420 }: { products: any[]; height?: number }) {
  const addItem = useCartStore((s) => s.addItem)
  const withClick = products.map((p) => ({
    ...p,
    onClick: () => addItem({ id: p.id, type: p.type, title: p.label, price: p.priceRaw, barcode: p.barcode, brand: p.brandKey, quantity: 1, slug: p.slug }),
  }))
  return (
    <div style={{ width: '100%', height }} className="canvas-container rounded-xl overflow-hidden">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <Scene products={withClick} />
      </Canvas>
      <p className="text-center text-xs font-mono text-white/30 mt-2">CLICK PRODUCT TO ADD TO CART</p>
    </div>
  )
}
