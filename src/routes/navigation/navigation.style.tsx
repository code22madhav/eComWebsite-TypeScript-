import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

export const NavigationContainer=styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`
export const LogoContainer=styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`
export const NavLinksContainer=styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
type NavLinkProps = Partial<LinkProps> & { as?: any };
export const NavLink=styled(Link)<NavLinkProps>`
    padding: 10px 15px;
    cursor: pointer;
`