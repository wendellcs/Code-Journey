import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

import earthTexture from '../../assets/images/earth-texture.jpg'

const Sphere = () => {
    const meshRef = useRef<THREE.Mesh>(null)
    const texture = useTexture(earthTexture)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005
        }
    })

    return (
        <mesh ref={meshRef} rotation={[0, 0, .1]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}

export const Earth = () => {
    return (
        <div className='absolute left-[-40%] w-full top-[-40%] h-200 opacity-10'>
            <Canvas>
                <ambientLight intensity={1} />
                <Sphere />
            </Canvas>
        </div>
    )
}