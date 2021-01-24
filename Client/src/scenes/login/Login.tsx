import * as React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { playerNicknameState } from 'models/player/atoms'

const Login = () => {
    const [nickname, setNickname] = useRecoilState(playerNicknameState);

    const onSetNickname = (event: React.ChangeEvent<HTMLInputElement>) => setNickname(event.target.value)

    return (
        <div>
            <div>Welcome to Coimbra</div>
            <div>What's your nickname ?</div>
            <input onChange={onSetNickname} value={nickname} />
            <Link to="/lobby">
                <button>Next</button>
            </Link>
        </div>
    )
}

export default Login;