import React from 'react';
import { withAuthenticator } from "@aws-amplify/ui-react";
import {NavBtnLink, SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap } from './SidebarElements';

const Sidebar = ({ isOpen, toggle, signOut}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClcik={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="quiz" onClick={toggle}>
                    Quiz
                </SidebarLink>
                <SidebarLink to="councillors" onClick={toggle}>
                    Councillors
                </SidebarLink>
                <SidebarLink to="parties" onClick={toggle}>
                    Party
                </SidebarLink>
                <SidebarLink to="profile" onClick={toggle}>
                    Profile
                </SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>

            <SidebarLink>
            <NavBtnLink onClick={signOut}Sign Out>Sign Out</NavBtnLink>  
                </SidebarLink>
                
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  );
};

export default withAuthenticator(Sidebar);

