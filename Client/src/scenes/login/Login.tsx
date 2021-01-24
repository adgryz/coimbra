import * as React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button, Input } from "@chakra-ui/react"

import { playerNicknameState } from 'models/player/atoms'

import styles from "./login.module.scss";

const Login = () => {
    const [nickname, setNickname] = useRecoilState(playerNicknameState);

    const onSetNickname = (event: React.ChangeEvent<HTMLInputElement>) => setNickname(event.target.value)

    return (
        <div className={styles.root}>
            <div className={styles.title}>Welcome to Coimbra</div>
            <div className={styles.question}>What's your nickname ?</div>
            <Input
                className={styles.nicknameInput}
                onChange={onSetNickname}
                value={nickname}
                placeholder="Nickname" />
            <Link to="/lobby" className={styles.nextButton}>
                <Button
                    disabled={!nickname}
                    colorScheme="teal">
                    Next
                </Button>
            </Link>
        </div>
    )
}

export default Login;