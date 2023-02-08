import React from 'react'
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter} from 'react-icons/fa'
import {FooterContainer, FooterWrapper, FooterLinksContainer, FooterLinksWrapper, 
FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrapper, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink} from './FooterElements'
import {animateScroll as scroll} from 'react-scroll'

const Footer = () => {

    const toggleHome = () =>{
        scroll.scrollToTop();
    };
  return (
   <FooterContainer>
    <FooterWrapper>
        <FooterLinksContainer>
            
            <FooterLinksWrapper>
            </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
            <SocialMediaWrapper>
                <SocialLogo to='/' onClick={toggleHome}>
                    ats us nai
                </SocialLogo>
                <WebsiteRights>ats us nai copyright
                All rights reserved</WebsiteRights>
                <SocialIcons>
                    <SocialIconLink href="/" target="_blank"
                    aria-label="Facebook">
                        <FaFacebook />
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank"
                    aria-label="Instagram">
                        <FaInstagram />
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank"
                    aria-label="YouTube">
                        <FaYoutube />
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank"
                    aria-label="Twitter">
                        <FaTwitter />
                    </SocialIconLink>
                </SocialIcons>
            </SocialMediaWrapper>

        </SocialMedia>
    </FooterWrapper>
   </FooterContainer>
  )
}

export default Footer