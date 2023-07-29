import { useEffect } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';

function GoogleAuthen() {
    return (
        <div>
            <LoginSocialGoogle
                client_id={'155086051019-fi6ooea9grv73qppcun3574r8f53nlms.apps.googleusercontent.com'}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    console.log(provider, data);
                }}
                onReject={(err) => {
                    console.log(err);
                }}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
        </div>
    );
}

export default GoogleAuthen;
