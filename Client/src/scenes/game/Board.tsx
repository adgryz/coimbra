import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { Canvas, Object3DNode, useFrame } from 'react-three-fiber'

import { currentGameState } from 'models/games/atoms';
import { Euler, Mesh } from 'three';

interface IBoxProps {
    position: [number, number, number]
}

const Box = (props: IBoxProps) => {
    const meshRef = React.useRef<Object3DNode<Mesh, typeof Mesh>>()

    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)

    useFrame(() => {
        (meshRef.current.rotation as Euler).x = (meshRef.current.rotation as Euler).y += 0.01
    })

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const Board = () => {
    const currentGame = useRecoilValue(currentGameState);

    return (
        <div>
            Coimbra game of { currentGame ? currentGame.playersIds : ''}
            <div>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </div>
        </div>
    )
}

export default Board;