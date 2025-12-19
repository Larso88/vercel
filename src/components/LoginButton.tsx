import styled from "styled-components";
import { useAuth } from "../auth/AuthProvider";

const AuthButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Button = styled.button`
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
    margin-bottom: 1rem;

  &:active {
    transform: scale(0.96);
  }
`;

const UserName = styled.span`
  font-size: 0.85rem;
  opacity: 0.75;
    text-align: center;
    align-items: center;
`;

const AdminBadge = styled.span`
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.3);
  margin-right: 0.6rem;
  opacity: 0.85;
`;

export const AuthButton = () => {
    const { authenticated, username, firstName, lastName, login, logout, hasRole } = useAuth();
    const displayName =
        firstName || lastName
            ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
            : username;


    if (!authenticated) {
        return <Button onClick={login}>Login</Button>;
    }

    return (
        <AuthButtonWrapper className="test">
            {hasRole("admin") && <AdminBadge>Admin</AdminBadge>}
            <Button onClick={logout}>Logout</Button>
            {username && <UserName>{displayName}</UserName>}
        </AuthButtonWrapper>
    );
};

export default AuthButton;
